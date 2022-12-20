-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientsId_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
