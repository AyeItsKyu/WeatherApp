import WeatherClient from './WeatherClient';

export default async function Page({ params }) {
   const resolvedParams = await params;
  return <WeatherClient city_name={resolvedParams.city_name} />;
}