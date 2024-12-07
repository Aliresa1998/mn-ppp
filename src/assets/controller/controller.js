import config from "./config";

const setPenalty = async (data) => {
  const isMock = true; // Set to true to use mock data

  if (isMock) {
    // Mocked response
    return {
      status: 200,
      message: "Success",
    };
  }

  // Original function for actual API calls
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const req = new Request(config.apiGateway.URL + "penalty", {
    body: JSON.stringify(data),
    method: "POST",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const readPlatesDetail = async (page) => {
  const isMock = true; // Set to true to use mock data

  if (isMock) {
    // Mocked response
    return {
      status: 200,
      message: "Success",
      json: {
        count: 8,
        plates: [
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-23-52.jpg",
            datetime: "2024-12-05-07-23-52",
            id: 8,
            predicted_string: "55-ص-334-10",
            raw_image_path: "images\\raw/raw_2024-12-05-07-23-52.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-23-40.jpg",
            datetime: "2024-12-05-07-23-40",
            id: 7,
            predicted_string: "55-ص-333-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-23-40.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-23-26.jpg",
            datetime: "2024-12-05-07-23-26",
            id: 6,
            predicted_string: "55-ص-333-15",
            raw_image_path: "images\\raw/raw_2024-12-05-07-23-26.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-23-22.jpg",
            datetime: "2024-12-05-07-23-22",
            id: 5,
            predicted_string: "55-ص-334-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-23-22.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-22-56.jpg",
            datetime: "2024-12-05-07-22-56",
            id: 4,
            predicted_string: "13-ل-158-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-22-56.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-22-31.jpg",
            datetime: "2024-12-05-07-22-31",
            id: 3,
            predicted_string: "75-د-342-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-22-31.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-21-53.jpg",
            datetime: "2024-12-05-07-21-53",
            id: 2,
            predicted_string: "34-س-272-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-21-53.jpg",
          },
          {
            cropped_plate_path: "images\\plate/plt_2024-12-05-07-21-50.jpg",
            datetime: "2024-12-05-07-21-50",
            id: 1,
            predicted_string: "34-ص-272-18",
            raw_image_path: "images\\raw/raw_2024-12-05-07-21-50.jpg",
          },
        ],
      },
    };
  }

  // Original function for actual API calls
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const req = new Request(
    config.apiGateway.URL + "plates/?page=" + page + "&limit=10",
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const readPenalties = async (page) => {
  const isMock = true; // Set to true to use mock data

  if (isMock) {
    // Mocked response
    return {
      status: 200,
      message: "Success",
      json: {
        count: 1,
        plates: [
          {
            plate_image_path: "images\\plate/plt_2024-12-05-07-23-52.jpg",
            datetime: "2024-12-05-07-23-52",
            id: 4,
            location: "شکریه",
            penaltytype: "پارک ممنوع",
            platename: "55-ص-334-10",
            raw_image_path: "images\\raw/raw_2024-12-05-07-23-52.jpg",
          },
        ],
      },
    };
  }

  // Original function for actual API calls
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const req = new Request(
    config.apiGateway.URL + "penalties/?page=" + page + "&limit=10",
    {
      method: "GET",
      headers: myHeaders,
    }
  );
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const removePenalty = async (id) => {
  const isMock = true; // Set to true to use mock data

  if (isMock) {
    // Mocked response
    return {
      status: 200,
      message: "record delted successfully",
    };
  }

  // Original function for actual API calls
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const req = new Request(config.apiGateway.URL + "penalty/" + id, {
    method: "DELETE",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json,
    status: response.status,
    message: response.message,
  };

  return res;
};

const updatePenalty = async (id) => {
  const isMock = true; // Set to true to use mock data

  if (isMock) {
    // Mocked response
    return {
      status: 200,
      message: "record updated successfully",
    };
  }

  // Original function for actual API calls
  const myHeaders = Object.assign({ "Content-Type": "application/json" });
  const req = new Request(config.apiGateway.URL + "penalty/" + id, {
    method: "PATCH",
    headers: myHeaders,
  });
  const response = await fetch(req);
  const json = await response.json();
  const res = {
    json,
    status: response.status,
    message: response.message,
  };

  return res;
};

export const controller = {
  readPlatesDetail,
  setPenalty,
  readPenalties,
  removePenalty,
  updatePenalty
};
