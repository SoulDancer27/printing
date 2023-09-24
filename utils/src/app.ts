import getIppStatusMessage from "./getPrinterStatus/ippStatusMessage";
import getPjlStatusMessage from "./getPrinterStatus/pjlStatusMessage";

const host = "93.175.8.79";
const port = 9102;

(async function main() {
  //const result = await getPjlStatusMessage(host, port, { timeout: 3000 });
  try {
    const result = await getIppStatusMessage(
      "http://81.5.119.132:26486/printers/test-nk"
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
