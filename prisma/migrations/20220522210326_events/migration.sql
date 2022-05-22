-- CreateTable
CREATE TABLE "presentation" (
    "id" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "room" INTEGER NOT NULL,
    "speakerId" TEXT NOT NULL,

    CONSTRAINT "presentation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "speaker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "attendeeId" TEXT,

    CONSTRAINT "attendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "speaker_email_key" ON "speaker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "attendee_email_key" ON "attendee"("email");

-- AddForeignKey
ALTER TABLE "presentation" ADD CONSTRAINT "presentation_speakerId_fkey" FOREIGN KEY ("speakerId") REFERENCES "speaker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendee" ADD CONSTRAINT "attendee_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "presentation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
