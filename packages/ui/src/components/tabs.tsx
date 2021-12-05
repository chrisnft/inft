import { Tab } from "@headlessui/react";
import { Section } from "./main";
import React from "react";

export const AppTabProps = (
  account: any,
  network: any,
  contract: any
) => [
  {
    tab: "👤 ",
    title: "👤  Account",
    // data: { address: account?.wallet.address, balance: account?.balance },
    data: account,
  },
  {
    tab: "🌎 ",
    title: "🌎  Network",
    data: network,
  },
  {
    tab: "📜 ",
    title: "📜  Contract",
    // data: account?.contract,
    data: contract,
  },
];

interface TopTabProps<T> {
  sections: T;
}

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isSelected(
  selected: any,
  index: number
) {
  if (selected === index) {
    return " bg-white shadow rounded-lg";
  } else {
    return " text-blue-100 hover:bg-white/[0.12] hover:text-white ";
  }
}

const setClassnames = (
  selected: any,
  index: number
) => {
  return classNames([
    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg opacity-100",
    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
    isSelected(selected, index),
  ]);
};

const outputToFile = (
  data: any,
  element: React.RefObject<HTMLAnchorElement>
) => {
  if (element && element.current) {
    // console.log(data)
    const output = JSON.stringify(data, null, 2);
    const file = new Blob([output], {
      type: "text/plain",
    });
    const current = element.current;
    current.href = URL.createObjectURL(file);
    current.download = "mint-network.json";
    current.click();
  }
};

export function AppTab<T>(props: TopTabProps<T>) {
  const [selected, setSelected] =
    React.useState(0);
  const handleChange = (index: number) => {
    setSelected(index);
  };
  const ref =
    React.useRef<HTMLAnchorElement>(null);

  const handleDownloadOnClick = (
    e: React.MouseEvent
  ) => {
    const v = {
      // @ts-expect-error
      account: props.sections[0].data,
      // @ts-expect-error
      network: props.sections[1].data,
      // @ts-expect-error
      contract: props.sections[2].data,
    };
    outputToFile(v, ref);
  };

  return (
    <div className="">
      <Tab.Group onChange={handleChange}>
        <div className="rounded-xl mb-2 p-2 shadow bg-gray-200 ">
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            {
              // @ts-ignore
              props.sections.map(
                // @ts-ignore
                (v, i) => (
                  <Tab
                    key={i}
                    className={() =>
                      setClassnames(selected, i)
                    }
                    // @ts-ignore
                    onClick={(e) =>
                      setSelected(i)
                    }
                  >
                    {v.tab}
                  </Tab>
                )
              )
            }
          </Tab.List>
        </div>
        <Tab.Panels>
          {
            // @ts-ignore
            props.sections.map(
              // @ts-ignore
              (v, i) => (
                <Tab.Panel key={i}>
                  {
                    <Section
                      handleDownloadOnClick={
                        handleDownloadOnClick
                      }
                      {...v}
                    />
                  }
                </Tab.Panel>
              )
            )
          }
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <a ref={ref} className="hidden" />
    </div>
  );
}
