import { CoreTemperatureSensorState } from "@ofqwx/ant-plus";
import { memo, useRef } from "react";
import styled from "styled-components";
import Box from "../grid/Box";
import Flex from "../grid/Flex";
import KviCard from "./KviCard";
import KvisContainer from "./KvisContainer";

type CoreBodyTemperatureSectionProps = {
  data: CoreTemperatureSensorState | null;
};

function CoreBodyTemperatureSection({ data }: CoreBodyTemperatureSectionProps) {
  return (
    <KvisContainer>
      <KviCard>
        <Flex direction="column">
          <Box>Core temperature</Box>
          <Box>{data !== null ? data.CoreTemp : "Waiting value..."}</Box>
        </Flex>
      </KviCard>

      <KviCard>
        <Flex direction="column">
          <Box>Skin temperature</Box>
          <Box>{data !== null ? data.SkinTemp : "Waiting value..."}</Box>
        </Flex>
      </KviCard>
    </KvisContainer>
  );
}

function areEqual(
  prevProps: CoreBodyTemperatureSectionProps,
  nextProps: CoreBodyTemperatureSectionProps
) {
  return (
    prevProps.data?.CoreTemp === nextProps.data?.CoreTemp &&
    prevProps.data?.SkinTemp === nextProps.data?.SkinTemp
  );
}

export default memo(CoreBodyTemperatureSection, areEqual);
