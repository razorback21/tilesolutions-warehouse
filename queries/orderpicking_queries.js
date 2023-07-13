// Put all reusable graphql queries here
import useApi from "../hooks/useApi";

const {tsQuery} = useApi();

export const fetchPickItemData = (sales_item_id) => {
    return tsQuery(`
            PickItemData($SalesItemID: Int!) {
              PickItemData(SalesItemID: $SalesItemID) {
                  Ordered
                  ProductID
                  ProductCode
                  ProductDescription
                  RemainingToBePick
                  UoM
                  HasPickedItems
              }
            }
        `,

        {
            "SalesItemID": sales_item_id
        }).then(res => {
        return res.data.data.PickItemData
    })
}

