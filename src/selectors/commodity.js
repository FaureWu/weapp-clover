import { createSelector } from 'reselect'

export const hotSaleCommoditiesSelector = createSelector(
  state => state.hotSale,
  ({ leftCommodities, rightCommodities }) => ({
    leftCommodities: leftCommodities.reduce(
      (result, item) => result.concat(item),
      [],
    ),
    rightCommodities: rightCommodities.reduce(
      (result, item) => result.concat(item),
      [],
    ),
  }),
)
