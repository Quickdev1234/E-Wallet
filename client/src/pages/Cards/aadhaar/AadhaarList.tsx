import { LoadingIndicator } from "@/components/Loading";
import { _axios } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Icon } from "@iconify/react";
import { formatDate } from "@/lib/formaters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAadhaarCardStore } from "@/store/AadhaarStore";
const AadhaarList = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("E_UserAuthToken")) {
      navigate("/auth-login");
    }
  }, []);
  const [alertOpen, setAlertOpen] = useState(false);
  const [cardId, setCardId] = useState("");
  const userId = localStorage.getItem("E_UserId");
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Aadhaar", pagination.page, pagination.limit],
    queryFn: async () => {
      return await _axios.get(
        `/user/card/aadhaarcard/allcards?userId=${userId}&page=${pagination.page}&limit=${pagination.limit}`
      );
    },
  });

  useEffect(() => {
    if (data) {
      setPagination((prev: any) => ({
        ...prev,
        total: data?.data?.count,
      }));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setPagination((prev: any) => ({
      ...prev,
      page,
    }));
  };
  const totalPages = useMemo(
    () => Math.ceil(pagination.total / pagination.limit),
    [pagination.total, pagination.limit]
  );

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: () => {
      return _axios.delete(`/user/card/aadhaarcard/delete?cardId=${cardId}`);
    },
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      refetch();
      setCardId("");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  if (isError)
    return (
      <div className='flex justify-center items-center h-[75vh]'>
        <div className='text-xl text-red-600'>Some thing went wrong</div>
      </div>
    );

  return (
    <main className=' p-3 md:p-6 h-full font-grotesk bg-gradient-to-b from-gray-100 to-gray-200 min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]'>
      <div className=''>
        <div className='flex justify-between flex-wrap  items-center'>
          <h2 className='text-xl md:text-2xl flex items-center gap-3  font-bold text-gray-800 mb-2 md:mb-4'>
            <Icon
              onClick={() => navigate("/dashboard")}
              icon='famicons:arrow-back-outline'
              className='text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform duration-200'
            />
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
              Aadhaar Cards
            </span>
          </h2>

          <button
            onClick={() => navigate("/upload-aadhaar-card")}
            className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-md hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'>
            Upload
          </button>
        </div>
        {isLoading && (
          <div className='flex justify-center items-center h-[70vh]'>
            <LoadingIndicator />
          </div>
        )}
        {data?.data?.Cards?.length === 0 && (
          <div className='flex justify-center items-center h-[70vh]'>
            <p className='text-gray-600'>No cards uploaded yet.</p>
          </div>
        )}

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data?.data?.Cards?.map((card: any) => (
            <div
              key={card._id}
              className='relative overflow-hidden p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-300'>
              <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-green-500'></div>

              <div className='space-y-2'>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon
                      icon='mdi:credit-card-chip-outline'
                      className='text-blue-500'
                    />
                  </span>
                  Card Number: {card.aadhaarNumber}
                </p>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon
                      icon='mdi:account-circle-outline'
                      className='text-purple-500'
                    />
                  </span>
                  Full Name: {card.fullName}
                </p>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon
                      icon='mdi:calendar-range'
                      className='text-green-500'
                    />
                  </span>
                  DOB: {formatDate(card.dateOfBirth)}
                </p>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon
                      icon='mdi:phone-outline'
                      className='text-indigo-500'
                    />
                  </span>
                  Mobile: {card.mobileNumber}
                </p>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon
                      icon='mdi:account-box-outline'
                      className='text-yellow-500'
                    />
                  </span>
                  Father Name: {card.fatherName}
                </p>
                <p className='text-sm text-gray-600 flex items-center'>
                  <span className='font-medium mr-2'>
                    <Icon icon='mdi:home-outline' className='text-orange-500' />
                  </span>
                  Address: {card.address}
                </p>
              </div>
              <div className='mt-4 flex justify-end gap-5 border-t pt-3 text-gray-500'>
                <Icon
                  icon='mdi:pencil-outline'
                  className='w-5 h-5 cursor-pointer hover:text-blue-600 transition-colors'
                  onClick={() => {
                    navigate(`/upload-aadhaar-card/${card._id}`);
                    useAadhaarCardStore.setState({
                      currentAadhaarCard: {
                        cardId: card._id,
                        aadhaarNumber: card.aadhaarNumber,
                        fullName: card.fullName,
                        dateOfBirth: card.dateOfBirth,
                        mobileNumber: card.mobileNumber,
                        fatherName: card.fatherName,
                        address: card.address,
                      },
                    });
                  }}
                />
                <Icon
                  icon='mdi:trash-can-outline'
                  className='w-5 h-5 cursor-pointer hover:text-red-600 transition-colors'
                  onClick={() => {
                    setAlertOpen(true);
                    setCardId(card?._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {data?.data?.Cards?.length > 0 && (
          <div className='flex justify-between'>
            <Pagination className='mt-6 justify-center'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={() => {
                      if (pagination.page === 1) return;
                      handlePageChange(pagination.page - 1);
                    }}
                    className={`${
                      pagination.page === 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer opacity-100"
                    }`}
                  />
                </PaginationItem>
                {pagination.page > 3 && (
                  <PaginationItem>
                    <PaginationLink
                      href='#'
                      onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {pagination.page > 4 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNumber = pagination.page + i - 1;
                  if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          href='#'
                          isActive={pageNumber === pagination.page}
                          onClick={() => handlePageChange(pageNumber)}>
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                {pagination.page < totalPages - 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {pagination.page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink
                      href='#'
                      onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={() => {
                      if (pagination.page === totalPages) return;
                      handlePageChange(pagination.page + 1);
                    }}
                    className={`${
                      pagination.page === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer opacity-100"
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className='font-inter'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              company account and remove company data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={() => {
                deleteMutate();
              }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default AadhaarList;
