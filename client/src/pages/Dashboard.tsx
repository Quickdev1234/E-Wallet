import { LoadingIndicator } from "@/components/Loading";
import { _axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("E_UserAuthToken")) {
      navigate("/auth-login");
    }
  }, []);
  
  const userName = localStorage.getItem("E_UserName");
  const userId = localStorage.getItem("E_UserId");
  const [modelOpen, setModelOpen] = useState(false);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 0,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Cards list", pagination.page, pagination.limit],
    queryFn: async () => {
      return await _axios.get(
        `/user/card/allcards?userId=${userId}&page=${pagination.page}&limit=${pagination.limit}`
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

  if (isError)
    return (
      <div className='flex justify-center items-center h-[75vh]'>
        <div className='text-xl text-red-600'>Some thing went wrong</div>
      </div>
    );

  return (
    <main className='p-6 h-full font-grotesk bg-gradient-to-b from-gray-100 to-gray-200 min-h-[100vh]'>
      <div className='flex items-center   justify-between'>
        <div className='flex  gap-4 items-start w-full justify-between'>
          <h1 className='text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600'>
            Hello {userName} !
          </h1>
          <div>
            <button
              onClick={() => {
                setModelOpen(true);
              }}
              className={`flex cursor-pointer items-center justify-start rounded-md p-2`}>
              <Icon
                icon={"solar:logout-2-bold"}
                className='mr-2 h-6 w-6 text-red-600'
              />
              <p className='text-md flex font-inter  items-center gap-3 rounded-lg px-3 py-4 font-semibold transition-all'>
                Logout
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className='mt-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-semibold text-gray-800'>
            Uploaded Cards
          </h2>
          <button
            onClick={() => navigate("/uplaod-card")}
            className='px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400'>
            Upload Card Details
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
              className='p-4 bg-white shadow-lg rounded-lg border border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-700'>
                {card.cardHolderName}
              </h3>
              <p className='text-sm text-gray-600 mt-1'>
                <span className='font-medium'>Card Number:</span>{" "}
                {card.cardNumber}
              </p>
              <p className='text-sm text-gray-600 mt-1'>
                <span className='font-medium'>Expiry Date:</span>{" "}
                {card.expiryDate}
              </p>
              <p className='text-sm text-gray-600 mt-1'>
                <span className='font-medium'>Card Type:</span> {card.cardType}
              </p>
              <p className='text-sm text-gray-600 mt-1'>
                <span className='font-medium'>CCV:</span> {card.ccv}
              </p>
              <p className='text-sm text-gray-600 mt-1'>
                <span className='font-medium'>Bank Name:</span> {card.bankName}
              </p>
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
      <Dialog modal open={modelOpen} onOpenChange={setModelOpen}>
        <DialogContent
          aria-describedby='logout-dialog-description'
          className='font-inter text-center text-2xl flex flex-col items-center'>
          <h1>Do you want to log out?</h1>

          <div className='flex w-full font-inter gap-4 mt-4 items-center justify-center'>
            <Button
              className='w-[20%] bg-blue-500 border font-grotesk text-white'
              variant='default'
              onClick={() => {
                localStorage.clear();
                navigate("/auth-login");
                toast.success("Logged out successfully");
              }}>
              Yes
            </Button>

            <Button
              className='w-[20%] bg-gray-500'
              variant='default'
              onClick={() => setModelOpen(false)}>
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Dashboard;
