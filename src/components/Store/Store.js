import { createStore } from "redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { config } from "../../config";

// const avaxAPI = async (address) => {
//     console.log(address);
//     try {
//       console.log({
//         address: address,
//       });

//       await axios({
//         url:
//           config.backendApi +
//           `43114/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
//         method: "GET",
//       })
//         .then((res) => {
//           console.log("then", res.data.data.items);
//           setBalanceState({
//             avalanche: res.data.data.items,
//           });
//         })
//         .catch((err) => {
//           console.log("catch", err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const bnbAPI = async (address) => {
//     console.log(address);
//     try {
//       console.log({
//         address: address,
//       });

//       await axios({
//         url:
//           config.backendApi +
//           `56/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
//         method: "GET",
//       })
//         .then((res) => {
//           console.log("then", res.data.data.items);
//         })
//         .catch((err) => {
//           console.log("catch", err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

  const ethAPI = async (address) => {
    console.log(address);
    try {
      console.log({
        address: address,
      });

      await axios({
        url:
          config.backendApi +
          `1/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
        method: "GET",
      })
        .then((res) => {
          console.log("then", res.data.data.items);
          return res.data.data.items;
        })
        .catch((err) => {
          console.log("catch", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

//   const polygonAPI = async (address) => {
//     console.log(address);
//     try {
//       console.log({
//         address: address,
//       });

//       await axios({
//         url:
//           config.backendApi +
//           `137/address/${address}/balances_v2/?key=ckey_170bf62322044e829af0f052b6e`,
//         method: "GET",
//       })
//         .then((res) => {
//           console.log("then", res.data.data.items);
//           setBalanceState({
//             polygon: [res.data.data.items],
//           });
//           console.log("Heyyyyy"+balanceState.polygon)
//         })
//         .catch((err) => {
//           console.log("catch", err);
//         });
//     } catch (err) {
//       console.log(err);
//     }
//   };

    const intialState = {
        eth: [],
        polygon: [],
        avalanche: [],
        binance: []
      }
      const eth = [];

    const reducer = async (state = eth, action) => {
        if(action.type === "api"){
            let data = await ethAPI(action.address);
            console.log("store", data)
            return data;
        }
                
        return state;
    }

    const store = createStore(reducer);

export default store;