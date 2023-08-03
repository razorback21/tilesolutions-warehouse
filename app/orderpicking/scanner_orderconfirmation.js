import AppBarCodeScanner from "../../components/shared/AppBarCodeScanner";

export default (props) => {

    const codeHandler = (data) => {
        alert(`Bar code with data ${data} has been scanned!`);
    };

    return  <AppBarCodeScanner scannerName="Scan Order Confirmation" codeHandler={codeHandler}/>
}
