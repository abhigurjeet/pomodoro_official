-- CreateTable
CREATE TABLE "Tomatodetail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activeTask" INTEGER NOT NULL DEFAULT -1,
    "currentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weeklyTomato" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0]::INTEGER[],
    "weeklyFocusTime" INTEGER[] DEFAULT ARRAY[0, 0, 0, 0, 0, 0, 0]::INTEGER[],

    CONSTRAINT "Tomatodetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tomatodetail_userId_key" ON "Tomatodetail"("userId");

-- AddForeignKey
ALTER TABLE "Tomatodetail" ADD CONSTRAINT "Tomatodetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
