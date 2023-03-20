import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { Accordion } from "../Accordion/Accordion";

type ItemProps = {
  description: string;
  quantity: string;
};

type CardProps = {
  requestNumber: string;
  date: string;
  purpose: string;
  requestedBy: string;
  items: Array<ItemProps>;
};

export const Card: FunctionComponent<CardProps> = ({
  requestNumber,
  date,
  purpose,
  requestedBy,
  items,
}) => {
  const router = useRouter();

  const handleApproval = (status: any) => {
    const token = Cookies.get("bearerToken");
    axios
      .patch(
        `http://192.168.137.161:5001/request-letters/${requestNumber}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status },
        }
      )
      .then((response) => {
        console.log(response);
        router.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-white rounded-lg shadow-lg w-full md:max-w-2xl ">
      <div className="p-3">
        <h2 className="text-xl font-bold m-2">{purpose}</h2>
        <hr />
        <div className="flex flex-row m-2">
          <div className="flex w-[50%] md:w-[25%]">
            <p className="text-gray-800">RL Number : </p>
          </div>
          <p> {requestNumber}</p>
        </div>
        <hr />

        <div className="flex flex-row m-2">
          <div className="flex w-[50%] md:w-[25%]">
            <p className="text-gray-800">Date : </p>
          </div>
          <p> {date}</p>
        </div>
        <hr />

        <div className="flex flex-row m-2">
          <div className="flex w-[50%] md:w-[25%]">
            <p className="text-gray-800">Requested By : </p>
          </div>
          <p>{requestedBy}</p>
        </div>
        <hr />

        <Accordion items={items} />

        <div className="flex mt-4 justify-center">
          <button
            onClick={() => handleApproval("Approved")}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
          >
            Approve
          </button>
          <button
            onClick={() => handleApproval("Approved")}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
