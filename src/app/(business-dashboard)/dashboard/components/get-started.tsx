"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "api/user-management";
import { Typography } from "components/ui/Typography";
import { useUserStore, useMerchantStore, useHydrateStore } from "store";
import { getMerchantByMerchantCode } from "api/merchant-management";
import { Button } from "components/ui/button";
import Link from "next/link";

type Props = {};

export default function CustomerName({ }: Props) {
    const [shouldUpdateBusiness, setShouldUpdateBusiness] = useState<boolean | undefined>(true)
    const [businessLink, setBusinessLink] = useState<string>()
    // @ts-ignore
    const state = useHydrateStore(useMerchantStore, (state) => state);
    
    const data = useHydrateStore(useMerchantStore, (state) => state.currentMerchantDetails)

    const { user } = useUserStore();
    // console.log(user, 'eee');
    const {currentMerchantDetails} = useMerchantStore();

    function checkInfoSet(obj: any) {
        if (!obj?.kycSet || !obj?.businessInfoSet || !obj?.accountInfoSet) {
            return true
        }

        return true
    }

    useEffect(() => {
        if (data) {
            if (checkInfoSet(data) === false) {
                setShouldUpdateBusiness(false)
            }
            console.log(state?.currentMerchantDetails, 'here');

        }
        if (state?.currentMerchantDetails?.businessType === 'INDIVIDUAL') {
            setBusinessLink('/dashboard/unregistered-business')
        } else {
            setBusinessLink('/dashboard/registered-business')
        }
    }, [data, state?.currentMerchantDetails])
    console.log(shouldUpdateBusiness, 'setShouldUpdateBusiness');



    return (
        <>
        {/* {"testing"  + state?.currentMerchantDetails?.businessCategory?.length } */}
            {
                //@ts-ignore
                (state?.currentMerchantDetails?.businessCategory?.length > 0 || state?.currentMerchantDetails?.businessCategory == undefined)   && <Button
                    asChild
                    variant="ghost"
                    key={"get-started"}
                    size="lg"
                    className="rounded-lg bg-secondary-60 py-2 font-bold text-white"
                >
                    <Link key={"/"} href={`${state?.currentMerchantDetails?.businessCategory ? businessLink : '/dashboard/update-about-business/page-one'}`}>
                        {state?.currentMerchantDetails?.businessCategory ? 'Continue business update' : 'Get started'}
                    </Link>
                </Button>
            }
        </>
    );
}
