import AddressForm from "./components/Address/AddressForm";
import HeaderLayout from "./components/Address/HeaderLayout";

const App = () => {

  return (
    <div>
      <HeaderLayout />
      <main>
        <AddressForm />
        {/* <Balance /> */}
      </main>
    </div>
  );
};

export default App;
