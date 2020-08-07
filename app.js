// Page
const reactorPage = document.querySelector(".reactor");
const pressurizedPage = document.querySelector(".pressurized");
const normalPage = document.querySelector(".normal");

// Page Button
const reactorBtn = document.querySelector(".reactor-btn");
const pressurizedBtn = document.querySelector(".pressurized-btn");
const normalBtn = document.querySelector(".normal-btn");

//
//
//

// Page Data - Reactor
const reactorTempAValue = document.querySelector(
  ".reactor .temperature-a .value"
);
const reactorTempAMax = document.querySelector(".reactor .temperature-a .max");
const reactorTempAMin = document.querySelector(".reactor .temperature-a .min");

const reactorTempBValue = document.querySelector(
  ".reactor .temperature-b .value"
);
const reactorTempBMax = document.querySelector(".reactor .temperature-b .max");
const reactorTempBMin = document.querySelector(".reactor .temperature-b .min");

const reactorPressureValue = document.querySelector(
  ".reactor .pressure .value"
);
const reactorPressureMax = document.querySelector(".reactor .pressure .max");
const reactorPressureMin = document.querySelector(".reactor .pressure .min");

const reactorFlowValue = document.querySelector(".reactor .flow .value");
const reactorFlowMax = document.querySelector(".reactor .flow .max");
const reactorFlowMin = document.querySelector(".reactor .flow .min");

//
//
//

// Page Data - Pressurized
const pressurizedTempValue = document.querySelector(
  ".pressurized .temperature .value"
);
const pressurizedTempMax = document.querySelector(
  ".pressurized .temperature .max"
);
const pressurizedTempMin = document.querySelector(
  ".pressurized .temperature .min"
);

const pressurizedVolumeValue = document.querySelector(
  ".pressurized .volume .value"
);
const pressurizedVolumeMax = document.querySelector(
  ".pressurized .volume .max"
);
const pressurizedVolumeMin = document.querySelector(
  ".pressurized .volume .min"
);

const pressurizedPressureValue = document.querySelector(
  ".pressurized .pressure .value"
);
const pressurizedPressureMax = document.querySelector(
  ".pressurized .pressure .max"
);
const pressurizedPressureMin = document.querySelector(
  ".pressurized .pressure .min"
);

const pressurizedFlowValue = document.querySelector(
  ".pressurized .flow .value"
);
const pressurizedFlowMax = document.querySelector(".pressurized .flow .max");
const pressurizedFlowMin = document.querySelector(".pressurized .flow .min");

//
//
//

// Page Data - Normal
const normalTempValue = document.querySelector(".normal .temperature .value");
const normalTempMax = document.querySelector(".normal .temperature .max");
const normalTempMin = document.querySelector(".normal .temperature .min");

const normalPressureValue = document.querySelector(".normal .pressure .value");
const normalPressureMax = document.querySelector(".normal .pressure .max");
const normalPressureMin = document.querySelector(".normal .pressure .min");

const normalFlowValue = document.querySelector(".normal .flow .value");
const normalFlowMax = document.querySelector(".normal .flow .max");
const normalFlowMin = document.querySelector(".normal .flow .min");

//
function ApiProvider() {
  let normal;
  let reactor;
  let pressurized;

  const apiData = async (url) => {
    const mainUrl = "http://sancaliar82.pythonanywhere.com/biogas";
    const response = await fetch(`${mainUrl}${url}`);
    // const response = await fetch(`.${url}.json`);
    const data = await response.json();
    return data;
  };

  this.getApi = () => {
    const apiNormal = apiData("/normal/");
    const apiReactor = apiData("/reactor/");
    const apiPressurized = apiData("/pressurized/");
    apiNormal.then((value) => {
      normal = value[0];
    });
    apiReactor.then((value) => {
      reactor = value[0];
    });
    apiPressurized.then((value) => {
      pressurized = value[0];
    });
  };

  Object.defineProperty(this, "normal", {
    get: () => {
      return normal;
    },
  });
  Object.defineProperty(this, "reactor", {
    get: () => {
      return reactor;
    },
  });
  Object.defineProperty(this, "pressurized", {
    get: () => {
      return pressurized;
    },
  });
}

function PageData() {
  this.reactor = (tempA, tempB, pressure, flow) => {
    reactorTempAValue.innerText = tempA;
    reactorTempBValue.innerText = tempB;
    reactorPressureValue.innerText = pressure;
    reactorFlowValue.innerText = flow;
  };
  this.pressurized = (temp, pressure, volume, flow) => {
    pressurizedTempValue.innerText = temp;
    pressurizedPressureValue.innerText = pressure;
    pressurizedVolumeValue.innerText = volume;
    pressurizedFlowValue.innerText = flow;
  };
  this.normal = (temp, pressure, flow) => {
    normalTempValue.innerText = temp;
    normalPressureValue.innerText = pressure;
    normalFlowValue.innerText = flow;
  };
}

const apiProvider = new ApiProvider();
apiProvider.getApi();
const pageData = new PageData();
setInterval(() => {
  apiProvider.getApi();
  const { normal, reactor, pressurized } = apiProvider;
  console.log(reactor, pressurized, normal);
  pageData.reactor(
    reactor.temperature_a,
    reactor.temperature_b,
    reactor.pressure,
    reactor.flow
  );
  pageData.pressurized(
    pressurized.temperature,
    pressurized.pressure,
    pressurized.level,
    pressurized.flow
  );
  pageData.normal(normal.temperature, normal.pressure, normal.flow);
}, 10000);

function PageRouter() {
  this.reactor = () => {
    pressurizedPage.classList.remove("active");
    pressurizedBtn.classList.remove("active");
    normalPage.classList.remove("active");
    normalBtn.classList.remove("active");
    reactorPage.classList.add("active");
    reactorBtn.classList.add("active");
  };
  this.pressurized = () => {
    reactorPage.classList.remove("active");
    reactorBtn.classList.remove("active");
    normalPage.classList.remove("active");
    normalBtn.classList.remove("active");
    pressurizedPage.classList.add("active");
    pressurizedBtn.classList.add("active");
  };
  this.normal = () => {
    reactorPage.classList.remove("active");
    reactorBtn.classList.remove("active");
    pressurizedPage.classList.remove("active");
    pressurizedBtn.classList.remove("active");
    normalPage.classList.add("active");
    normalBtn.classList.add("active");
  };
}

const pageRouter = new PageRouter();

reactorBtn.addEventListener("click", pageRouter.reactor);
pressurizedBtn.addEventListener("click", pageRouter.pressurized);
normalBtn.addEventListener("click", pageRouter.normal);
