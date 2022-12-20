-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "code" SERIAL NOT NULL,
    "productsId" TEXT NOT NULL,
    "clientsId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
