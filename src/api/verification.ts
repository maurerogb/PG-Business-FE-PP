export const activateNewMerchant = async (activeMerchantParams: API.ActivateMerchantParams) => {
  return await fetch(
    `http://137.184.47.182:8081/payaccess/api/v1/merchant/activate-account/${activeMerchantParams.email}/${activeMerchantParams.activationToken}`,
    {
      method: "GET",
      redirect: "follow",
    }
  )
}
