import { CarImages } from "./../../../configs/schema";

const FormatResult = (resp) => {
  const resultMap = new Map();

  resp.forEach((item) => {
    const listingId = item.carListing?.id; // Corrected typo: carLisiting -> carListing
    if (!listingId) return; // Skip if listingId is undefined

    if (!resultMap.has(listingId)) {
      resultMap.set(listingId, {
        car: item.carListing,
        images: [],
      });
    }

    if (item.CarImages) {
      resultMap.get(listingId).images.push(item.CarImages);
    }
  });

  const finalResult = Array.from(resultMap.values()); // Convert Map to Array
  return finalResult;
};

export default {
  FormatResult,
};
