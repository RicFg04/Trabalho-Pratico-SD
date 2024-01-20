-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "whs_sales" DOUBLE PRECISION NOT NULL,
    "rtl_sales" DOUBLE PRECISION NOT NULL,
    "item_description" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "rtl_transfers" DOUBLE PRECISION NOT NULL,
    "item_type" TEXT NOT NULL,
    "cal_month_num" DOUBLE PRECISION NOT NULL,
    "item_code" DOUBLE PRECISION NOT NULL,
    "calendar_year" DOUBLE PRECISION NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);
