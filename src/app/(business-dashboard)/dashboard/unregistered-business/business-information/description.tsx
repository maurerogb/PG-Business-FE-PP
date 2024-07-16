import React from "react";

type Props = {
  data: any,
  setCountry: string
};

export default function BusinessInformation({data, setCountry}: Props) {
  return (
    <div>
      <div className="flex flex-col items-start justify-start gap-6 ">
        <div className="h-px border border-zinc-400"></div>
        <div className="flex flex-col items-start justify-start gap-8 ">
          <div className="inline-flex items-start justify-start gap-6 ">
            <div className="flex items-start justify-start gap-24">
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Business Name
                </div>
                <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                {data?.businessName}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Support
                </div>
                <div className="w-20 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  {data?.supportContact}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Business Mobile Number
                </div>
                <div className="text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  {data?.primaryMobile}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-start h-20 gap-6 ">
            <div className="flex items-start justify-start h-20 gap-24 ">
              <div className="flex items-start justify-end gap-4">
                <div className="self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                    Business description
                  </div>
                  <div className=" text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                    {data?.businessDescription?.length > 0 ? data?.businessDescription : 'NILL'}
                  </div>
                </div>
                <div className="w-72 self-stretch flex-col justify-start items-start gap-0.5 inline-flex">
                  <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                    Business Email
                  </div>
                  <div className="w-72 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                   {data?.businessEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start justify-start gap-6 ">
            <div className="flex items-start justify-start gap-24">
            <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  Country
                </div>
                <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  {setCountry}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  State
                </div>
                <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-normal">
                  {data?.businessState}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">
                  City
                </div>
                <div className="w-20 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
                  {data?.businessCity}
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex items-start self-stretch justify-start gap-24">
            <div className="inline-flex flex-col items-start justify-start gap-2">
              <div className="text-slate-500 text-sm font-normal font-['Averta']">
                Website URL
              </div>
              <div className="text-gray-700 text-base font-semibold font-['Averta'] leading-snug">
               { data?.businessWebsite.includes("https://") ? data?.businessWebsite.includes("www.")? data?.businessWebsite: `www.${data?.businessWebsite}` : data?.businessWebsite.includes("www.")? data?.businessWebsite : `https://www.${data?.businessWebsite}`} 
              </div>
            </div>
          </div>
          {/*  <div className="flex flex-col items-start self-stretch justify-start h-32 gap-2">
            <div className="w-20 h-6 text-slate-500 text-sm font-normal font-['Averta']">
              Uploads
            </div>
           <div className="inline-flex items-start justify-start h-36 gap-36">
              <div className="inline-flex flex-col items-start justify-start">
                <div className="inline-flex items-center "> */}
                  {/* <div className="w-6 h-6 px-0.5 py-0.5 justify-center items-center flex">
                    <div className="relative flex flex-col items-start justify-start w-5 h-5" />
                  </div> */}
                  {/* <div className="w-52 text-gray-700 text-base font-semibold font-['Averta'] leading-none">
                    Business logo . png
                  </div>
                </div>
              </div> 
            </div>
          </div>*/}
        </div>
        
      </div>
    </div>
  );
}
