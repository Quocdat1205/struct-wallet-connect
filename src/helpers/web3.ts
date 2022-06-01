import { DAI_CONTRACT } from "../constants";

export function getDaiContract(chainId: number, web3: any) {
  const dai = new web3.eth.Contract(
    DAI_CONTRACT[chainId].abi,
    DAI_CONTRACT[chainId].address
  );
  return dai;
}

export function callBalanceOf(address: string, chainId: number, web3: any) {
  return new Promise(async (resolve, reject) => {
    const dai = getDaiContract(chainId, web3);

    await dai.methods
      .balanceOf(address)
      .call(
        { from: "0x0000000000000000000000000000000000000000" },
        (err: any, data: any) => {
          if (err) {
            reject(err);
          }

          resolve(data);
        }
      );
  });
}

export function callTransfer(address: string, chainId: number, web3: any) {
  return new Promise(async (resolve, reject) => {
    const dai = getDaiContract(chainId, web3);

    await dai.methods
      .transfer(address, "1")
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
  });
}

export const getAllBuyer = async (chainId: number, web3: any) => {
  const dai = getDaiContract(chainId, web3);

  const allBuyer = await dai.methods.getAllBuyer().call();

  return allBuyer;
};

export const buyInsurance = async (
  address: string,
  chainId: number,
  web3: any
) => {
  try {
    const dai = getDaiContract(chainId, web3);

    const _ = await dai.methods
      .buyInsurance(address, 1667186126, 1111, 222222)
      .send({ from: address });

    return _;
  } catch (error) {
    console.error(error);
  }
};
