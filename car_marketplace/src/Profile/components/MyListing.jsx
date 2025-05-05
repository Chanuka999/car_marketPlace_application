import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { db } from "./../../../configs/Index";
import { CarImages, CarListing } from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Service from "./../../components/Shared/Service";
import CarItem from "./../../components/CarItem";
import { FaTrashAlt } from "react-icons/fa";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  const GetUserCarListing = async () => {
    try {
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(
          eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(CarListing.id));

      const resp = Service.FormatResult(result);
      setCarList(resp);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to="/add_listing">
          <Button>+ Add New Listing</Button>
        </Link>
      </div>

      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : carList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
          {carList.map((item, index) => (
            <div key={index}>
              <CarItem car={item} />
              <div className="p-2 bg-gray-50 rounded-lg flex justify-between gap-.5">
                <Link
                  to={"/add-listing?mode=edit&id=" + item?.id}
                  className="w-full"
                >
                  <Button variant="outline" className="w-3/4">
                    Edit
                  </Button>
                </Link>

                <Button variant="destructive">
                  <FaTrashAlt />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No listings found.</p>
      )}
    </div>
  );
};

export default MyListing;
