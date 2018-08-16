/**
 * Created by weDevs
 */

import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { ModalBox } from "@components";
import { Events, Config } from "@common";
import styles from "./wdstyles";

export default class WdModalSorting extends PureComponent {
  componentDidMount() {
    Events.onOpenModalLayout(this.open);
  }

  open = () => this.modal.openModal();

  close = () => this.modal.closeModalLayout();

  render() {
    return (
      <ModalBox ref={(modal) => (this.modal = modal)} type="modalBoxWrap">
        <View style={styles.layoutBox}>
          <Text>MODAL</Text>
        </View>
      </ModalBox>
    );
  }
}
