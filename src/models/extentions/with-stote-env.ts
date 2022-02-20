import { getEnv, IStateTreeNode } from "mobx-state-tree"
import { Environment } from "../environment"

export const withStoreEnv = (self: IStateTreeNode) => ({
  views: {
    /**
     * The environment.
     */
    get environment() {
      return getEnv<Environment>(self)
    },
  },
})
