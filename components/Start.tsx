import { useQuery, gql } from "@apollo/client";

const GET_LIVE_DATA = gql`
  query GetLiveData {
    getLiveData {
      symbol
      timestamp
      price
    }
  }
`

export default function GetLiveData() {
  const { loading, error, data } = useQuery(GET_LIVE_DATA, {
    pollInterval: 60000,
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
