import * as React from "react";
import styles from "./Test01.module.scss";
import { ITest01Props } from "./ITest01Props";
import { escape } from "@microsoft/sp-lodash-subset";
import { FunctionComponent } from "react";
import { useState } from "react";
import { IUserItem } from "./IUserItem";
import { useEffect } from "react";
import { MSGraphClient } from "@microsoft/sp-http";

const Test01: FunctionComponent<ITest01Props> = (props) => {
  const [user, setUser] = useState<IUserItem>();

  useEffect(() => {
    props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient) => {
        client
          .api("me")
          .version("v1.0")
          .select("displayName")
          .get((err, res) => {
            if (err) {
              console.error("MSGraphAPI Error")
              console.error(err);
              return;
            }

            setUser({
              displayName: res.displayName,
            });
          });
      });
  }, []);

  return <div>Hello {user && user.displayName}</div>;
};

export default Test01;
