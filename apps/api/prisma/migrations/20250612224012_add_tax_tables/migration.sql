-- CreateTable
CREATE TABLE "tax_countries" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "tax_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_country_administrative_divisions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "tax_country_administrative_divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_rates" (
    "id" SERIAL NOT NULL,
    "rate" DECIMAL(5,4) NOT NULL,
    "country_id" INTEGER,
    "administrative_division_id" INTEGER,

    CONSTRAINT "tax_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_exemptions" (
    "id" SERIAL NOT NULL,
    "administrative_division_id" INTEGER NOT NULL,
    "tax_country_id" INTEGER,
    "category" TEXT NOT NULL,
    "no_tax" BOOLEAN,
    "conditional_exemption" BOOLEAN,
    "threshold_amount" DECIMAL(10,2),
    "tax_price_difference_above_threshold" BOOLEAN,

    CONSTRAINT "tax_exemptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tax_countries_code_key" ON "tax_countries"("code");

-- CreateIndex
CREATE INDEX "index_tax_countries_name" ON "tax_countries"("name");

-- CreateIndex
CREATE INDEX "index_tax_countries_code" ON "tax_countries"("code");

-- CreateIndex
CREATE INDEX "index_tax_country_administrative_divisions_country_id" ON "tax_country_administrative_divisions"("country_id");

-- CreateIndex
CREATE INDEX "index_tax_country_administrative_divisions_name" ON "tax_country_administrative_divisions"("name");

-- CreateIndex
CREATE INDEX "index_tax_rates_country_id" ON "tax_rates"("country_id");

-- CreateIndex
CREATE INDEX "index_tax_rates_administrative_division_id" ON "tax_rates"("administrative_division_id");

-- CreateIndex
CREATE INDEX "index_tax_exemptions_administrative_division_id" ON "tax_exemptions"("administrative_division_id");

-- CreateIndex
CREATE INDEX "index_tax_exemptions_tax_country_id" ON "tax_exemptions"("tax_country_id");

-- AddForeignKey
ALTER TABLE "tax_country_administrative_divisions" ADD CONSTRAINT "tax_country_administrative_divisions_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tax_countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "tax_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_rates" ADD CONSTRAINT "tax_rates_administrative_division_id_fkey" FOREIGN KEY ("administrative_division_id") REFERENCES "tax_country_administrative_divisions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_exemptions" ADD CONSTRAINT "tax_exemptions_administrative_division_id_fkey" FOREIGN KEY ("administrative_division_id") REFERENCES "tax_country_administrative_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_exemptions" ADD CONSTRAINT "tax_exemptions_tax_country_id_fkey" FOREIGN KEY ("tax_country_id") REFERENCES "tax_countries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
