"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { publicAxios } from "@/lib/axios";
import ProductCard, { Product } from "@/components/shared/ProductCard";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";

const FlashSale = ({
  showAllLink = true,
  maxItems = 5,
}: {
  showAllLink?: boolean;
  maxItems?: number;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["flashSaleProducts"],
    queryFn: async () => {
      const res = await publicAxios.get("/products/flash-sale");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const products: Product[] = data?.data || [];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = useMemo(() => {
    const validDates = products
      .map((product) => product.pricing?.saleEndDate)
      .filter(Boolean)
      .map((date) => new Date(date as string))
      .filter((date) => !isNaN(date.getTime()));

    if (validDates.length === 0) return null;

    return validDates.reduce((earliest, next) =>
      next.getTime() < earliest.getTime() ? next : earliest,
    );
  }, [products]);

  useEffect(() => {
    if (!targetDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div>
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
          <div className="text-left">
            <h2 className="text-xl sm:text-3xl font-black text-gray-950 tracking-tight mb-2">
              Flash <span className="text-secondary">Sale</span>
            </h2>
            <div className="flex gap-1.5 sm:gap-2">
              {targetDate ? (
                [
                  timeLeft.days,
                  timeLeft.hours,
                  timeLeft.minutes,
                  timeLeft.seconds,
                ].map((val, i) => (
                  <div
                    key={i}
                    className="bg-gray-950 text-white rounded-lg w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center flex-col shadow-md"
                  >
                    <span className="text-xs sm:text-sm font-black leading-none">
                      {val < 10 ? `0${val}` : val}
                    </span>
                    <span className="text-[6px] sm:text-[7px] uppercase font-bold text-gray-500 mt-0.5">
                      {["D", "H", "M", "S"][i]}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No active flash sale products right now.
                </p>
              )}
            </div>
          </div>

          {showAllLink && (
            <Link
              href="/flash-sale"
              className="shrink-0 flex items-center gap-1.5 bg-gray-50 text-gray-500 hover:text-secondary px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-gray-100 transition-all font-bold text-[10px] sm:text-xs shadow-sm group"
            >
              <span>All Sale</span>
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {[...Array(5)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
            {products.slice(0, maxItems).map((item, index) => (
              <ProductCard key={item._id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;
