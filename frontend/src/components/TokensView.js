import { SendIcon } from "./sendIcon";
import { ViewIcon } from "./viewIcon";
import {
  useParams,
  useLocation
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getNftsForAccount } from "../utils/connectWallet";
import { COINEX_TESTNET_EXPLORER } from "../constants";


const TokensView = (props) => {

  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    const address = localStorage.getItem('address');
    if (address && !['', 'undefined'].includes(address)) {
      (getNftsForAccount(address)).then(resp => {
        console.log('resp', resp);
        setNfts(resp);
      });
    }
  }, []);

  return (
    <div className="overflow-x-auto mt-[8rem]">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-start justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-3xl leading-normal">
                <th className="py-3 px-6 text-left">{' '}</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Creator</th>
                <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-3xl font-light">
                {nfts && nfts.length > 0 && nfts.map((nft, i) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100" key={`${i}`}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={nft.image} alt={nft.title} className="w-[8rem]"/>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{nft.title}</span>
                      </div>
                    </td>
                    <td className="p-0 text-center">
                      <div className="flex item-center justify-center">
                      <img src="/taylor.jpg" alt="..." className=" w-[3rem] shadow rounded-full align-middle border-none" />
                      <div className="flex items-center px-[1rem]">
                        <span className="font-medium">Taylor S.</span>
                      </div>
                      </div>
                    </td>
                    <td className="p-0 text-center">
                      <div className="flex item-center justify-center">
                        <a href={`${COINEX_TESTNET_EXPLORER}/token/${nft.nftContractAddress}?a=${nft.nftId}`} target="_blank">
                          <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110" data-bs-toggle="tooltip" title="View this NFT">
                            <ViewIcon />
                          </div>
                        </a>
                        <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110" data-bs-toggle="tooltip" title="Gift this NFT">
                          <SendIcon />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensView;