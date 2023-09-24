import { StatusRequestResult } from "./types";
const ipp = require("@sealsystems/ipp");

export default async function getIppStatusMessage(uri: string) {
  return new Promise<StatusRequestResult>((resolve, reject) => {
    const data = ipp.serialize({
      operation: "Get-Printer-Attributes",
      "operation-attributes-tag": {
        "attributes-charset": "utf-8",
        "attributes-natural-language": "en",
        "printer-uri": uri,
      },
    });

    ipp.request(uri, data, function (err: Error, res: any) {
      if (err) {
        reject({ result: "con_error" });
      }
      resolve({ result: "success", message: JSON.stringify(res, null, 2) });
    });
  });
}
