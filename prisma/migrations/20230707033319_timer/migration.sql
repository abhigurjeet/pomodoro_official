-- CreateTable
CREATE TABLE "Timersetting" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "pomodoro" INTEGER DEFAULT 1500,
    "shortBreak" INTEGER DEFAULT 300,
    "longBreak" INTEGER DEFAULT 900,
    "pomoTechnique" BOOLEAN NOT NULL DEFAULT false,
    "autoStart" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Timersetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timersetting_userId_key" ON "Timersetting"("userId");

-- AddForeignKey
ALTER TABLE "Timersetting" ADD CONSTRAINT "Timersetting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
