import classes from "./AddressForm.module.css";
import { useState, Fragment, useMemo } from "react";
import Web3 from "web3";
import axios from "axios";
import { config } from "../../config";
import Cart from "../UI/Cart";
import Loader from "../UI/Loader";

const AddressForm = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const [balanceState, setBalanceState] = useState({
    eth: [],
    polygon: [],
    avalanche: [],
    binance: [],
  });

  const [isLoading, setLoading] = useState(null);
  const isShow = useMemo(
    () => !isLoading && balanceState.eth.length !== 0,
    [isLoading, balanceState]
  );

  const avaxAPI = async (address) => {
    try {
      let result = await axios({
        url:
          config.backendApi +
          `43114/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
        method: "GET",
      });
      let array = result.data.data.items
        .slice()
        .filter((a) => a.contract_ticker_symbol === "AVAX")
        .concat(
          result.data.data.items
            .slice(1)
            .sort((a, b) => b.balance - a.balance)
            .filter((a) => a.contract_ticker_symbol !== "AVAX")
        );
      return array;
    } catch (err) {
      console.log(err);
    }
  };

  const bnbAPI = async (address) => {
    try {
      let result = await axios({
        url:
          config.backendApi +
          `56/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
        method: "GET",
      });
      let array = result.data.data.items
        .slice()
        .filter((a) => a.contract_ticker_symbol === "BNB")
        .concat(
          result.data.data.items
            .slice(1)
            .sort((a, b) => b.balance - a.balance)
            .filter((a) => a.contract_ticker_symbol !== "BNB")
        );
      return array;
    } catch (err) {
      console.log(err);
    }
  };

  const ethAPI = async (address) => {
    try {
      let result = await axios({
        url:
          config.backendApi +
          `1/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
        method: "GET",
      });
      let array = result.data.data.items
        .slice()
        .filter((a) => a.contract_ticker_symbol === "ETH")
        .concat(
          result.data.data.items
            .slice(1)
            .sort((a, b) => b.balance - a.balance)
            .filter((a) => a.contract_ticker_symbol !== "ETH")
        );
      return array;
    } catch (err) {
      console.log(err);
    }
  };

  const polygonAPI = async (address) => {
    try {
      let result = await axios({
        url:
          config.backendApi +
          `137/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
        method: "GET",
      });
      let array = result.data.data.items
        .slice()
        .filter((a) => a.contract_ticker_symbol === "MATIC")
        .concat(
          result.data.data.items
            .slice(1)
            .sort((a, b) => b.balance - a.balance)
            .filter((a) => a.contract_ticker_symbol !== "MATIC")
        );
      return array;
    } catch (err) {
      console.log(err);
    }
  };

  let ethereumList = () => (
    <Fragment>
      <tr>
        <th>Symbol</th>
        <th>Balance</th>
      </tr>
      {balanceState.eth.map((entry) => (
        <tr key={entry.contract_address}>
          <td> {entry.contract_ticker_symbol}</td>
          <td>
            {parseFloat(Web3.utils.fromWei(entry.balance, "ether")).toFixed(4)}
          </td>
        </tr>
      ))}
    </Fragment>
  );

  let avaxList = () => (
    <Fragment>
      <tr>
        <th>Symbol</th>
        <th>Balance</th>
      </tr>
      {balanceState.avalanche.map((entry) => (
        <tr key={entry.contract_address}>
          <td> {entry.contract_ticker_symbol}</td>
          <td>
            {parseFloat(Web3.utils.fromWei(entry.balance, "ether")).toFixed(4)}
          </td>
        </tr>
      ))}
    </Fragment>
  );

  let polygonList = () => (
    <Fragment>
      <tr>
        <th>Symbol</th>
        <th>Balance</th>
      </tr>
      {balanceState.polygon.map((entry) => (
        <tr key={entry.contract_address}>
          <td> {entry.contract_ticker_symbol}</td>
          <td>
            {parseFloat(Web3.utils.fromWei(entry.balance, "ether")).toFixed(4)}
          </td>
        </tr>
      ))}
    </Fragment>
  );

  let binanceList = () => (
    <Fragment>
      <tr>
        <th>Symbol</th>
        <th>Balance</th>
      </tr>
      {balanceState.binance.map((entry) => (
        <tr key={entry.contract_address}>
          <td> {entry.contract_ticker_symbol}</td>
          <td>
            {parseFloat(Web3.utils.fromWei(entry.balance, "ether")).toFixed(4)}
          </td>
        </tr>
      ))}
    </Fragment>
  );

  const walletAddressHandler = (event) => {
    setWalletAddress(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!Web3.utils.isAddress(walletAddress)) {
      setBalanceState({
        eth: [],
        polygon: [],
        avalanche: [],
        binance: [],
      });
      alert("Invalid Address!");
    } else {
      setLoading(true);
      await Promise.all([
        ethAPI(walletAddress),
        polygonAPI(walletAddress),
        bnbAPI(walletAddress),
        avaxAPI(walletAddress),
      ]).then((values) => {
        setBalanceState({
          eth: values[0],
          polygon: values[1],
          binance: values[2],
          avalanche: values[3],
        });
        setLoading(false);
      });
    }
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={(e) => onSubmitHandler(e)}>
        <label>Enter Your Wallet Address</label>
        <input
          type={"text"}
          value={walletAddress}
          onChange={(e) => walletAddressHandler(e)}
        />
        <button>Submit</button>
      </form>
      {isLoading && <Loader />}
      {isShow && (
        <Fragment>
          <label className={classes.output_label}>
            {" "}
            BALANCES OF {walletAddress}
          </label>
          <div className={classes.output}>
            <Cart label={"ETHEREUM"}>{ethereumList(walletAddress)}</Cart>
            <Cart label={"AVALANCHE"}>{avaxList(walletAddress)}</Cart>
            <Cart label={"POLYGON"}>{polygonList(walletAddress)}</Cart>
            <Cart label={"BINANCE"}>{binanceList(walletAddress)}</Cart>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddressForm;
