let generatedData;

export const getDonutChartData = themes => {
  if (generatedData) {
    generatedData.datasets[0].backgroundColor = [
      themes.danger,
      themes.info,
      themes.primary,
    ];
  } else {
    generatedData = {
      labels: ['Completed', 'On-going', 'Dropped'],
      datasets: [
        {
          label: 'Mangas (thousands)',
          backgroundColor: [themes.danger, themes.info, themes.primary],
          data: [2478, 5267, 734],
        },
      ],
    };
  }

  return generatedData;
};
