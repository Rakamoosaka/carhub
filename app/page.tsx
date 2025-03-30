import { fetchCars } from "@/utils";
import { HomeProps, FilterProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { CarCard, ShowMore, SearchBar, CustomFilter, Hero } from "@/components";

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const filters: FilterProps = {
    manufacturer: params.manufacturer as string,
    model: params.model as string,
    fuel: params.fuel as string,
    year: params.year ? Number(params.year) : 2022,
  };

  const allCars = await fetchCars(filters);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard
                  key={`${car.make}-${car.model}-${car.year}-${index}`}
                  car={car}
                />
              ))}
            </div>
            <ShowMore pageNumber={10 / 10} isNext={10 > allCars.length} />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
