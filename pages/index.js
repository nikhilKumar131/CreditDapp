import Youtube from "react-youtube";
import { useRef, useState, useEffect } from 'react';
import web3modal from "web3modal";
import { ethers } from 'ethers';
import { address, ABI } from '../contracts/smc';

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  }
}
export default function Home() {

  const [myBalanceValue, setMyBalanceValue] = useState(0);
  const [balanceValue, setBalanceValue] = useState();
  let web3modalRef = useRef();
  const [walletStatus, setWalletStatus] = useState(false);
  const [txnHash, setTxnHash] = useState("__");
  const [blockNo, setBlockNo] = useState()

  const [input1, setInput1] = useState();
  const [input2, setInput2] = useState();
  const [input3, setInput3] = useState();
  const [input4, setInput4] = useState();
  const [input5, setInput5] = useState();



  async function getProviderOrSigner(signer = false) {
    try {
      const provider = await web3modalRef.current.connect()
      const providers = new ethers.providers.Web3Provider(provider)

      //checking network connected
      const { chainId } = await providers.getNetwork();
      if (chainId !== 11155111) {
        window.alert("Change the network to Sepolai");
        throw new Error("Change network to Sepolai");
      }
      5
      if (signer) {
        const signer = providers.getSigner();
        return signer;
      }

      return providers;
    }
    catch {
      (err) => { console.error(err) }
    }

  }

  useEffect(() => {
    if (walletStatus == false) {
      web3modalRef.current = new web3modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      getProviderOrSigner()
      setWalletStatus(true)
      myTbalance();
    }
    try { balance() } catch { err => { console.error(err) } }

  }, [walletStatus])

  //functions

  //mint function to mint free tokens
  async function mint() {
    try {
      const signer = await getProviderOrSigner(true);
      const addr = await signer.getAddress();


      const contract = new ethers.Contract(address, ABI, signer);
      const txn = await contract.mint(input2, input1);
      const reciept = await txn.wait();
      console.log(txn);
      myTbalance();

    }
    catch { err => { console.error(err) } }
  }

  //token Balance
  async function Tbalance() {
    try {
      const signer = await getProviderOrSigner(true);

      const contract = new ethers.Contract(address, ABI, signer);
      const txn = await contract.balanceOf(input3);
      const _bal = parseInt(txn);
      // const reciept = await txn.wait();
      console.log(_bal);
      setBalanceValue(_bal)

    }
    catch { err => { console.error(err) } }
  }

  //check Your credit Balance
  async function myTbalance() {
    try {
      const signer = await getProviderOrSigner(true);
      const addr = await signer.getAddress();
      console.log(addr);

      const contract = new ethers.Contract(address, ABI, signer);
      const txn = await contract.balanceOf(addr);
      const _bal = parseInt(txn);
      // const reciept = await txn.wait();
      console.log(_bal);
      setMyBalanceValue(_bal)

    }
    catch { err => { console.error(err) } }
  }

  //Transaction of credit
  async function Transaction() {
    try {
      const signer = await getProviderOrSigner(true);

      const contract = new ethers.Contract(address, ABI, signer);
      const txn = await contract.transfer(input4,input5);
      console.log(txn);
      const reciept = await txn.wait();
      console.log(reciept);
      setTxnHash(reciept.transactionHash)
      setBlockNo(`https://sepolia.etherscan.io/block/${reciept.blockNumber}`)
      myTbalance();

    }
    catch { err => { console.error(err) } }
  }





 

  return (

    <div className=" bg-gray-800 h-full text-white">
      <div className=" ">
        <img src="banner.jpg" className="absolute w-full overflow-hidden" />

        {/* <div className=" h-20 flex justify-center items-center relative">
          header
        </div> */}
        <div className=" h-96 flex flex-row  items-center w-screen relative">
          <div className="ml-20 w-3/5">
            <h1 className="text-4xl">CREDIT Defi</h1>
            <p className="text-lg">This contract is  deployed on <span className="font-bold text-xl">SEPOLAIeth</span> test network</p>
            <button className="bg-orange-500 rounded-full ">< a className=" text-lg mt-10 mx-10" onClick={getProviderOrSigner}>MetaMask</a></button>
            <p className="text-lg mt-10">Only Owner of contract can use this MINT functions</p>
            <button className="bg-orange-500 rounded-full " onClick={mint}>< a className=" text-lg mt-10 mx-10" >Mint</a></button>
            <input className="mx-10  rounded-xl text-black" placeholder=" XX units" onChange={(e) => { setInput1(e.target.value) }} />
            <input className=" rounded-xl text-black" placeholder=" address" onChange={(e) => { setInput2(e.target.value) }} />
            <p className="text-lg mt-10">Check Balance here</p>
            <button className="bg-orange-500 rounded-full " onClick={Tbalance}>< a className=" text-lg mt-10 mx-10" >Balance</a></button>
            <input className="mx-10  rounded-xl text-black" placeholder=" XX units" onChange={(e) => { setInput3(e.target.value) }} />
            <a>{balanceValue}</a>
          </div>
          <div className="flex w-2/5 justify-center items-center">
            <Youtube videoId="USvABoF1RsQ" onReady={(e) => {e.target.pauseVideo()}} opts={opts} className="relative align-middle mt-20" />
          </div>

        </div>
        <div className="relative ml-20 mt-36">
          <div className="">
            Everyone have initial balance of 1000 units.
          </div>
          <div >
            click <a className="text-blue-700 " href="https://github.com/nikhilKumar131/CreditDapp/blob/main/contracts/contract.sol" target="_blank">here</a> to get to github link of the deployed SMART CONTRACT</div>
        </div>
      </div>
      <div className="">
        <div className="relative mt-36 grid  grid-row-3 gap-10 justify-center">
          <div className="flex ">
            Address:
            <input className="mx-10 bg-gray-800 rounded-xl hover:bg-gray-500" placeholder=" address here" onChange={(e) => { setInput4(e.target.value) }} />
          </div>
          <div className="flex ">
            Amount:
            <input className="mx-10 bg-gray-800 rounded-xl hover:bg-gray-500" placeholder=" units here" onChange={(e) => { setInput5(e.target.value) }} />
            <button className="bg-orange-500 rounded-full ">< a className=" text-lg mt-10 mx-10" onClick={Transaction}>Transfer</a></button>
          </div>
          <div className="flex justify-center space-x-4 pb-1">
            Your Balance: <span>{myBalanceValue}</span> (refresh if not updated)
          </div>
          <div>
            <p>Transaction Hash: {txnHash}</p>
            <p>Block explorer <a className="text-blue-600" href={blockNo} target="_blank">link</a>: {blockNo}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
