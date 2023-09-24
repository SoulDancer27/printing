import net from "net";
import { StatusRequestResult } from "./types";

// Sends pjl ustatus request to the printer
export default async function getPjlStatusMessage(
  host: string,
  port: number,
  options?: { timeout: number }
) {
  return new Promise<StatusRequestResult>((resolve, reject) => {
    const timeout = options?.timeout || 10000;
    const ESC = String.fromCharCode(27);
    const CR = String.fromCharCode(13);
    const LF = String.fromCharCode(10);

    const ustatusOn = "@PJL USTATUS DEVICE = ON";
    const ustatusTimed = "@PJL USTATUS TIMED = 5";

    const eoj = ESC + `%-12345X`;
    const message =
      eoj +
      "@PJL JOB NAME='ping'" +
      CR +
      LF +
      ustatusOn +
      CR +
      LF +
      ustatusTimed +
      CR +
      LF +
      eoj;

    const client = new net.Socket();
    client.setTimeout(timeout);
    client.setKeepAlive(true, timeout);

    let buffer: any;

    client.connect(port, host, function () {
      client.write(message);
    });

    client.on("error", function (error) {
      client.end();
      resolve({ result: "con_error" });
    });

    client.on("timeout", () => {
      client.end();
      resolve({ result: "con_timeout" });
    });

    // Collect all the incomnig status information
    client.on("data", function (data) {
      buffer += data;
    });

    // Automatically close the client after some delay
    setTimeout(() => {
      client.end();
      if (buffer) {
        const message = buffer.toString();
        resolve({ result: "success", message });
      }
      resolve({ result: "con_timeout" });
    }, timeout);

    client.on("close", function () {});
  });
}
