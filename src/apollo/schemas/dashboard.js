import gql from 'graphql-tag';

export const QUERIES = {
  DASHBOARD: gql`
    query FETCH_DASHBOARD {
      dashboardStats {
        mangas {
          total
          completed
          onGoing
        }
        readersStats {
          name
          profilePic
          chaptersRead
        }
        todayStats {
          users
          chapters
          downloads
        }
        overAllStats {
          users
          devices
          issues
        }
        countryStats {
          name
          users
        }
        monthlyStats {
          date
          chapters
        }
      }
    }
  `,
};
