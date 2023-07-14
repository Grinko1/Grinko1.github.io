import {useContext} from "react";
import {ServicesContext} from "../context";
import React from "react";

/**
 * Хук для доступа к сервисам
 * @return {Services}
 */
export default function useServices() {
  return useContext(ServicesContext);
}
