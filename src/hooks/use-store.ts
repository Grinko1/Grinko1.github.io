import useServices from "./use-services";
import React from "react";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store}
 */
export default function useStore() {
  //@ts-ignore
  return useServices().store;
}
