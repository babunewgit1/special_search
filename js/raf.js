const dateDate =
  (apiData.response.flight_legs[0].date_date +
    apiData.response.flight_legs[0].total_distance__statute_m__number) /
  item.cruise_speed_avg_fixedrate_number;

const timeStampDate = new Date(dateDate * 1000);
const timeStampOptions = {
  month: "short",
  day: "numeric",
  year: "numeric",
};
const localFormatDate = timeStampDate.toLocaleDateString(
  "en-US",
  timeStampOptions
);
