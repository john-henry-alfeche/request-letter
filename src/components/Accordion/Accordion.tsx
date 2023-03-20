import { FunctionComponent, useState } from "react";

type ItemProps = {
  description: string;
  quantity: string;
};

type AccordionProps = {
  items: Array<ItemProps>;
};

export const Accordion: FunctionComponent<AccordionProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-lg">
      <button
        className="flex justify-between w-full pl-2 pr-4 py-2"
        onClick={toggleAccordion}
      >
        <span className="text-gray-800">Items</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="pl-2 py-2 overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.description}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
        </div>
      )}
    </div>
  );
};
