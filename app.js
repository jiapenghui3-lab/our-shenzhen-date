const STORAGE_KEY = 'shenzhen-date-planner-v3';
const LEGACY_STORAGE_KEY = 'shenzhen-date-planner-v2';
const MAX_SAVED = 3;

function orderCards(catalog, orderedIds) {
  const byId = new Map(catalog.map((item) => [item.id, item]));
  return orderedIds.map((id) => byId.get(id)).filter(Boolean);
}

const foodCatalog = [
  {
    id: 'cheong-fun', kind: '清爽粤式', title: '肠粉配粥', price: '约 ¥10–22/人',
    area: '南山各商圈 · 很容易找到', image: 'assets/cards/food-cheong-fun.webp',
    description: '软滑肠粉配一碗热粥，刚睡醒也吃得舒服。', tags: ['清淡', '粤式', '暖胃']
  },
  {
    id: 'pork-knuckle-rice', kind: '米饭党首选', title: '猪脚饭', price: '约 ¥18–30/人',
    area: '南山、科技园 · 常见', image: 'assets/cards/food-pork-knuckle-rice.webp',
    description: '卤得软糯的猪脚配米饭和青菜，实在又管饱。', tags: ['下饭', '份量足', '卤香']
  },
  {
    id: 'chaoshan-kway-teow', kind: '深圳很对味', title: '潮汕牛肉粿条', price: '约 ¥20–35/人',
    area: '南山、蛇口 · 常见', image: 'assets/cards/food-chaoshan-kway-teow.webp',
    description: '清汤、牛肉丸和粿条，鲜香但不会太重口。', tags: ['潮汕味', '热汤', '稳妥']
  },
  {
    id: 'chongqing-noodles', kind: '想吃点辣', title: '重庆小面', price: '约 ¥12–25/人',
    area: '南山各商圈 · 常见', image: 'assets/cards/food-chongqing-noodles.webp',
    description: '麻辣香气很直接，少辣到重辣都能调。', tags: ['麻辣', '嗦面', '辣度可调']
  },
  {
    id: 'shaxian-set', kind: '经典搭配', title: '沙县小吃套餐', price: '约 ¥12–25/人',
    area: '深圳到处都容易找到', image: 'assets/cards/food-shaxian-set.webp',
    description: '拌面、蒸饺再加一份汤，想怎么搭都很轻松。', tags: ['套餐', '选择多', '有汤有面']
  },
  {
    id: 'yunnan-rice-noodles', kind: '汤粉党', title: '云南米线', price: '约 ¥15–30/人',
    area: '后海、科技园 · 常见', image: 'assets/cards/food-yunnan-rice-noodles.webp',
    description: '热汤米线配肉和蔬菜，口味可清淡也可酸辣。', tags: ['热乎', '可选口味', '米线']
  },
  {
    id: 'luosifen', kind: '重口快乐', title: '柳州螺蛳粉', price: '约 ¥13–28/人',
    area: '南山、南头 · 常见', image: 'assets/cards/food-luosifen.webp',
    description: '酸笋、腐竹和花生都加上，想吃重口就选它。', tags: ['酸辣', '配料足', '嗦粉']
  },
  {
    id: 'roast-meat-rice', kind: '广东经典', title: '烧腊双拼饭', price: '约 ¥22–39/人',
    area: '南山各商圈 · 常见', image: 'assets/cards/food-roast-meat-rice.webp',
    description: '叉烧、烧鸭或油鸡任选双拼，一盘就吃得很满足。', tags: ['双拼', '下饭', '粤式']
  },
  {
    id: 'malatang', kind: '她来挑菜', title: '麻辣烫', price: '约 ¥20–39/人',
    area: '商场和街区都容易找到', image: 'assets/cards/food-malatang.webp',
    description: '喜欢什么夹什么，辣度和汤底都能自己选。', tags: ['自由搭配', '可选辣度', '热乎']
  },
  {
    id: 'xinjiang-rice-noodles', kind: '香辣浓郁', title: '新疆炒米粉', price: '约 ¥18–32/人',
    area: '南头、后海 · 容易找到', image: 'assets/cards/food-xinjiang-rice-noodles.webp',
    description: '粗米粉裹满辣酱，配牛肉和芹菜，越吃越香。', tags: ['香辣', '有嚼劲', '重口']
  },
  {
    id: 'hainan-chicken-rice', kind: '清爽米饭', title: '海南鸡饭', price: '约 ¥22–39/人',
    area: '海岸城、后海 · 常见', image: 'assets/cards/food-hainan-chicken-rice.webp',
    description: '嫩鸡、香米和蘸酱组合，清爽又不会吃不饱。', tags: ['鸡肉', '不油腻', '米饭']
  },
  {
    id: 'dumplings', kind: '面食党', title: '东北手工水饺', price: '约 ¥18–35/人',
    area: '南山、蛇口 · 常见', image: 'assets/cards/food-dumplings.webp',
    description: '现煮饺子馅料选择多，蘸醋吃简单又舒服。', tags: ['手工', '馅料多', '稳妥']
  },
  {
    id: 'bibimbap', kind: '异国简餐', title: '韩式石锅拌饭', price: '约 ¥22–35/人',
    area: '商场、大学城 · 常见', image: 'assets/cards/food-bibimbap.webp',
    description: '蔬菜、煎蛋和米饭拌在一起，锅巴很香。', tags: ['韩式', '蔬菜多', '一人餐']
  },
  {
    id: 'pho', kind: '清爽嗦粉', title: '越南牛肉粉', price: '约 ¥25–39/人',
    area: '后海、蛇口 · 较常见', image: 'assets/cards/food-pho.webp',
    description: '清香牛肉汤、米粉和香草，吃完不会太撑。', tags: ['清爽', '牛肉', '东南亚']
  },
  {
    id: 'burger-chicken', kind: '熟悉的快乐', title: '汉堡炸鸡套餐', price: '约 ¥15–35/人',
    area: '深圳各商圈 · 很容易找到', image: 'assets/cards/food-burger-chicken.webp',
    description: '脆鸡、汉堡和薯条，想吃简单一点就选它。', tags: ['炸物', '方便', '套餐']
  },
  {
    id: 'mini-hotpot', kind: '热气腾腾', title: '单人小火锅', price: '约 ¥29–39/人',
    area: '南山商场、街区 · 常见', image: 'assets/cards/food-mini-hotpot.webp',
    description: '肉菜都有的小锅，不用点一大桌也能吃火锅。', tags: ['小火锅', '荤素都有', '不浪费']
  },
  {
    id: 'beef-noodles', kind: '一碗刚好', title: '兰州牛肉面', price: '约 ¥15–28/人',
    area: '南山各街区 · 常见', image: 'assets/cards/food-beef-noodles.webp',
    description: '清汤、牛肉和手工面，热乎、快速、很稳妥。', tags: ['牛肉', '手工面', '热汤']
  },
  {
    id: 'wonton-noodles', kind: '港味小店', title: '鲜虾云吞面', price: '约 ¥18–32/人',
    area: '蛇口、南头 · 常见', image: 'assets/cards/food-wonton-noodles.webp',
    description: '弹牙云吞配细面和清汤，口味轻却不寡淡。', tags: ['鲜虾', '清汤', '港味']
  },
  {
    id: 'claypot-rice', kind: '锅巴最香', title: '广式煲仔饭', price: '约 ¥20–38/人',
    area: '南山、蛇口 · 常见', image: 'assets/cards/food-claypot-rice.webp',
    description: '腊味或滑鸡配脆锅巴，酱汁一拌就很香。', tags: ['锅巴', '广式', '管饱']
  },
  {
    id: 'roujiamo', kind: '西北搭配', title: '肉夹馍配凉皮', price: '约 ¥15–30/人',
    area: '科技园、南头 · 常见', image: 'assets/cards/food-roujiamo.webp',
    description: '一个酥香肉夹馍加一碗凉皮，咸香又开胃。', tags: ['西北味', '套餐', '咸香']
  },
  {
    id: 'japanese-curry', kind: '温和口味', title: '日式咖喱饭', price: '约 ¥20–35/人',
    area: '南山商场 · 常见', image: 'assets/cards/food-japanese-curry.webp',
    description: '浓香但不辣，配鸡排或牛肉都很稳妥。', tags: ['不辣', '咖喱', '简餐']
  },
  {
    id: 'panfried-buns', kind: '小吃也顶饱', title: '生煎包套餐', price: '约 ¥15–30/人',
    area: '后海、南头 · 常见', image: 'assets/cards/food-panfried-buns.webp',
    description: '底脆多汁的生煎，配一碗汤就是一顿午饭。', tags: ['酥脆', '小吃', '江浙味']
  },
  {
    id: 'sweet-soup', kind: '甜口加场', title: '糖水配小吃', price: '约 ¥10–28/人',
    area: '南头古城、蛇口 · 选择多', image: 'assets/cards/food-sweet-soup.webp',
    description: '芒果西米露、豆花或双皮奶，再配一份小吃。', tags: ['甜品', '少量多样', '清甜']
  },
  {
    id: 'cart-noodles', kind: '港式自由配', title: '车仔面', price: '约 ¥18–35/人',
    area: '蛇口、后海 · 较常见', image: 'assets/cards/food-cart-noodles.webp',
    description: '鱼蛋、萝卜和肉类自己加，份量也能自己控制。', tags: ['自由搭配', '港式', '粉面']
  }
];

const foodCards = orderCards(foodCatalog, [
  'chongqing-noodles',
  'luosifen',
  'pork-knuckle-rice',
  'xinjiang-rice-noodles',
  'beef-noodles',
  'chaoshan-kway-teow',
  'malatang',
  'roast-meat-rice',
  'yunnan-rice-noodles',
  'cheong-fun',
  'mini-hotpot',
  'wonton-noodles',
  'claypot-rice',
  'cart-noodles',
  'roujiamo',
  'hainan-chicken-rice',
  'panfried-buns',
  'dumplings',
  'bibimbap',
  'shaxian-set',
  'japanese-curry',
  'burger-chicken',
  'pho',
  'sweet-soup'
]);

const playCards = [
  {
    id: 'shenzhen-library', kind: '雨天第一选', title: '深圳图书馆', price: '免费 · 看当日开放', weather: '雨天',
    area: '福田 · 市民中心', image: 'assets/places/play-shenzhen-library.jpg',
    description: '建筑和光影都很干净，找书、看展或坐着发呆都可以。', tags: ['图书馆', '室内', '建筑感']
  },
  {
    id: 'shenzhen-museum', kind: '慢慢看一下午', title: '深圳博物馆', price: '免费 · 看当日预约', weather: '雨天',
    area: '福田 · 市民中心', image: 'assets/places/play-shenzhen-museum.jpg',
    description: '常设展内容丰富，空间大，雨天安排不会显得仓促。', tags: ['博物馆', '室内', '免费']
  },
  {
    id: 'pet-cafe', kind: '下雨就贴贴', title: '当天现场选猫狗咖', price: '看当天团购', weather: '雨天',
    area: '南山 · 按评分和营业状态选店', image: 'assets/line-puppy-hug.gif', imageFit: 'contain',
    description: '不预设具体店铺，到当天再挑空间宽敞、评价稳定的一家。', tags: ['猫狗', '室内', '现场选店']
  },
  {
    id: 'sea-world', kind: '海边夜景', title: '海上世界街区', price: '公共区免费', weather: '都可以',
    area: '南山 · 蛇口', image: 'assets/places/play-sea-world.jpg',
    description: '明华轮、广场和海边集中在一起，小雨也容易找地方躲。', tags: ['夜景', '海边', '好逛']
  },
  {
    id: 'oct-loft', kind: '艺术街拍', title: 'OCT 创意园', price: '街区免费', weather: '都可以',
    area: '南山 · 华侨城', image: 'assets/places/play-oct-loft.jpg',
    description: '旧厂房、树荫和设计小店适合边逛边拍，小雨也有氛围。', tags: ['工业风', '艺术', '小店']
  },
  {
    id: 'talent-park', kind: '湖边看鸟', title: '深圳人才公园', price: '免费', weather: '晴天',
    area: '南山 · 后海', image: 'assets/places/play-talent-park.jpg',
    description: '湖边有鸟群和开阔步道，傍晚还能接着看城市夜景。', tags: ['小动物', '湖景', '离南山近']
  },
  {
    id: 'qianhai-stone', kind: '开阔日落', title: '前海石公园', price: '免费', weather: '晴天',
    area: '南山 · 前海', image: 'assets/places/play-qianhai-stone.jpg',
    description: '临海草坪和现代建筑很开阔，带一束小花拍照正合适。', tags: ['大草坪', '海景', '出片']
  },
  {
    id: 'dapeng-fortress', kind: '远一点也值得', title: '大鹏所城', price: '古城公共区免费', weather: '都可以',
    area: '大鹏新区 · 鹏城社区', image: 'assets/places/play-dapeng-fortress.jpg',
    description: '城墙、古巷和老建筑辨识度高，适合慢慢走和拍照。', tags: ['古城', '建筑', '远途备选']
  },
  {
    id: 'civic-axis', kind: '城市大片', title: '莲花山看城市中轴', price: '免费', weather: '晴天',
    area: '福田 · 莲花山山顶广场', image: 'assets/places/play-civic-center.jpg',
    description: '站在高处看市民中心和天际线，视野大，照片也有深圳感。', tags: ['天际线', '城市景观', '免费']
  }
];

const initialState = {
  version: 3,
  stage: 'intro',
  foodSaved: [],
  playSaved: [],
  foodIndex: 0,
  playIndex: 0,
  wishes: { eat: '', drink: '', go: '' }
};

const validStages = new Set(['intro', 'food', 'play', 'complete']);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function cloneInitialState() {
  return JSON.parse(JSON.stringify(initialState));
}

function uniqueValidIds(values, cards) {
  const validIds = new Set(cards.map((item) => item.id));
  return [...new Set(Array.isArray(values) ? values : [])].filter((id) => validIds.has(id)).slice(0, MAX_SAVED);
}

function loadState() {
  const clean = cloneInitialState();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.version === 3) {
      clean.stage = validStages.has(stored.stage) ? stored.stage : 'intro';
      clean.foodSaved = uniqueValidIds(stored.foodSaved, foodCards);
      clean.playSaved = uniqueValidIds(stored.playSaved, playCards);
      clean.foodIndex = Number.isInteger(stored.foodIndex) ? Math.max(0, Math.min(stored.foodIndex, foodCards.length - 1)) : 0;
      clean.playIndex = Number.isInteger(stored.playIndex) ? Math.max(0, Math.min(stored.playIndex, playCards.length - 1)) : 0;
      clean.wishes = {
        eat: String(stored.wishes?.eat || '').slice(0, 80),
        drink: String(stored.wishes?.drink || '').slice(0, 80),
        go: String(stored.wishes?.go || '').slice(0, 80)
      };
    } else {
      const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
      if (legacy?.wishes) {
        clean.wishes.eat = String(legacy.wishes.eat || '').slice(0, 80);
        clean.wishes.drink = String(legacy.wishes.drink || '').slice(0, 80);
        clean.wishes.go = String(legacy.wishes.go || '').slice(0, 80);
      }
    }
  } catch {
    return clean;
  }

  if ((clean.stage === 'play' || clean.stage === 'complete') && clean.foodSaved.length === 0) {
    clean.stage = 'food';
  }
  if (clean.stage === 'complete' && clean.playSaved.length === 0) {
    clean.stage = 'play';
  }
  return clean;
}

function escapeHtml(value) {
  const node = document.createElement('span');
  node.textContent = String(value);
  return node.innerHTML;
}

function getCard(cards, id) {
  return cards.find((item) => item.id === id) || null;
}

let state = loadState();
let visibleStage = state.stage;
let activeMode = state.stage === 'play' ? 'play' : 'food';
let animating = false;
let nextCardReady = false;
let pointerStart = null;
let lastTouchTap = null;
let transitionTimer = null;
let toastTimer = null;

const elements = {
  views: [...document.querySelectorAll('[data-view]')],
  introView: document.querySelector('#introView'),
  pickerView: document.querySelector('#pickerView'),
  completeView: document.querySelector('#completeView'),
  backButton: document.querySelector('#backButton'),
  homeLink: document.querySelector('#homeLink'),
  ideaButton: document.querySelector('#ideaButton'),
  startButton: document.querySelector('#startButton'),
  resumeButton: document.querySelector('#resumeButton'),
  stageEyebrow: document.querySelector('#stageEyebrow'),
  stageQuestion: document.querySelector('#stageQuestion'),
  savedCounter: document.querySelector('#savedCounter'),
  deck: document.querySelector('#deck'),
  nextCardPreview: document.querySelector('#nextCardPreview'),
  nextCardImage: document.querySelector('#nextCardImage'),
  nextCardKind: document.querySelector('#nextCardKind'),
  nextCardWeather: document.querySelector('#nextCardWeather'),
  nextCardTitle: document.querySelector('#nextCardTitle'),
  nextCardPrice: document.querySelector('#nextCardPrice'),
  nextCardArea: document.querySelector('#nextCardArea'),
  card: document.querySelector('#swipeCard'),
  cardImage: document.querySelector('#cardImage'),
  cardKind: document.querySelector('#cardKind'),
  cardWeather: document.querySelector('#cardWeather'),
  cardTitle: document.querySelector('#cardTitle'),
  cardPrice: document.querySelector('#cardPrice'),
  cardArea: document.querySelector('#cardArea'),
  cardDescription: document.querySelector('#cardDescription'),
  cardTags: document.querySelector('#cardTags'),
  collectBurst: document.querySelector('#collectBurst'),
  deckPosition: document.querySelector('#deckPosition'),
  deckTotal: document.querySelector('#deckTotal'),
  skipButton: document.querySelector('#skipButton'),
  saveButton: document.querySelector('#saveButton'),
  savedPreview: document.querySelector('#savedPreview'),
  reviewButton: document.querySelector('#reviewButton'),
  finalTimeline: document.querySelector('#finalTimeline'),
  wishSummary: document.querySelector('#wishSummary'),
  editPlanButton: document.querySelector('#editPlanButton'),
  restartButton: document.querySelector('#restartButton'),
  ideaDialog: document.querySelector('#ideaDialog'),
  ideaForm: document.querySelector('#ideaForm'),
  closeIdeaDialog: document.querySelector('#closeIdeaDialog'),
  wishEat: document.querySelector('#wishEat'),
  wishDrink: document.querySelector('#wishDrink'),
  wishGo: document.querySelector('#wishGo'),
  toast: document.querySelector('#toast'),
  toastText: document.querySelector('#toastText')
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast('本次选择暂时无法保存');
  }
}

function showToast(message) {
  elements.toastText.textContent = message;
  elements.toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove('show'), 1450);
}

function focusView(view) {
  view.setAttribute('tabindex', '-1');
  view.focus({ preventScroll: true });
  window.setTimeout(() => view.removeAttribute('tabindex'), 50);
}

function setStage(stage, options = {}) {
  const { persist = true, focus = true } = options;
  window.clearTimeout(transitionTimer);
  animating = false;
  pointerStart = null;
  lastTouchTap = null;
  visibleStage = stage;
  if (persist) {
    state.stage = stage;
    saveState();
  }

  elements.views.forEach((view) => { view.hidden = true; });
  elements.backButton.hidden = stage === 'intro';

  let targetView = elements.introView;
  if (stage === 'intro') {
    elements.introView.hidden = false;
    const hasProgress = state.stage !== 'intro' || state.foodSaved.length > 0 || state.playSaved.length > 0;
    elements.resumeButton.hidden = !hasProgress;
  } else if (stage === 'food' || stage === 'play') {
    activeMode = stage;
    elements.pickerView.hidden = false;
    renderPicker();
    targetView = elements.pickerView;
  } else if (stage === 'complete') {
    elements.completeView.hidden = false;
    renderComplete();
    targetView = elements.completeView;
  }

  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  if (focus) focusView(targetView);
}

function activeCards() {
  return activeMode === 'food' ? foodCards : playCards;
}

function activeSavedIds() {
  return activeMode === 'food' ? state.foodSaved : state.playSaved;
}

function currentIndex() {
  return activeMode === 'food' ? state.foodIndex : state.playIndex;
}

function setCurrentIndex(index) {
  if (activeMode === 'food') state.foodIndex = index;
  else state.playIndex = index;
}

function currentCard() {
  return activeCards()[currentIndex()];
}

function nextAvailableIndex(startIndex) {
  const cards = activeCards();
  return (startIndex + cards.length) % cards.length;
}

function setNextCardProgress(value) {
  const progress = Math.min(Math.max(value, 0), 1);
  elements.deck.style.setProperty('--next-card-y', `${8 * (1 - progress)}px`);
  elements.deck.style.setProperty('--next-card-rotation', `${1.7 * (1 - progress)}deg`);
  elements.deck.style.setProperty('--next-card-scale', String(0.956 + (0.044 * progress)));
}

function resetDeckMotion(immediate = false) {
  if (immediate) {
    elements.card.style.transition = 'none';
    elements.nextCardPreview.style.transition = 'none';
  }
  elements.deck.classList.remove('is-dragging', 'is-advancing');
  setNextCardProgress(0);
  elements.card.classList.remove('flying');
  elements.nextCardPreview.style.transform = '';
  
  if (immediate) {
    elements.card.style.transform = '';
    elements.card.style.opacity = '';
    void elements.card.offsetHeight; // Force layout flush
    elements.card.style.transition = '';
    elements.nextCardPreview.style.transition = '';
  }
}

function normalizeCurrentIndex() {
  const cards = activeCards();
  setCurrentIndex((currentIndex() + cards.length) % cards.length);
}

function preloadNextImages() {
  const cards = activeCards();
  for (let offset = 2; offset <= 3; offset += 1) {
    const item = cards[(currentIndex() + offset) % cards.length];
    const image = new Image();
    image.src = item.image;
  }
}

function renderPicker() {
  normalizeCurrentIndex();
  const isFood = activeMode === 'food';
  elements.pickerView.dataset.mode = activeMode;
  elements.stageEyebrow.textContent = isFood ? 'STEP 01 · LUNCH' : 'STEP 02 · HAVE FUN';
  elements.stageQuestion.textContent = isFood ? '中午想吃什么？' : '想去哪里玩？';
  elements.deckTotal.textContent = `/ ${activeCards().length}`;
  renderCard();
  renderSavedPreview();
}

function renderCard() {
  const item = currentCard();
  if (!item) return;
  const alreadySaved = activeSavedIds().includes(item.id);

  elements.card.className = 'swipe-card';
  resetDeckMotion(true);
  elements.collectBurst.classList.remove('show');
  elements.cardKind.textContent = alreadySaved ? '已收录' : item.kind;
  elements.cardWeather.hidden = activeMode === 'food';
  elements.cardWeather.textContent = item.weather || '';
  elements.cardTitle.textContent = item.title;
  elements.cardPrice.hidden = activeMode === 'food' || !item.price;
  elements.cardPrice.textContent = activeMode === 'food' ? '' : (item.price || '');
  elements.cardArea.textContent = item.area;
  elements.cardDescription.textContent = item.description;
  elements.cardTags.innerHTML = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  elements.deckPosition.textContent = String(currentIndex() + 1);
  const spokenPrice = activeMode === 'play' && item.price ? `，${item.price}` : '';
  elements.card.setAttribute('aria-label', `${item.title}${spokenPrice}，${item.area}。按回车收录，按左右方向键换一个。`);

  elements.cardImage.classList.add('loading');
  elements.cardImage.alt = `${item.title}配图`;
  elements.cardImage.style.objectFit = item.imageFit || 'cover';
  elements.cardImage.onload = () => elements.cardImage.classList.remove('loading');
  elements.cardImage.onerror = () => {
    elements.cardImage.classList.remove('loading');
    elements.cardImage.alt = `${item.title}配图暂时无法加载`;
  };
  elements.cardImage.src = item.image;
  elements.skipButton.disabled = true;
  elements.saveButton.disabled = activeSavedIds().length >= MAX_SAVED || alreadySaved;
  renderNextCard();
  preloadNextImages();
}

function renderNextCard() {
  const cards = activeCards();
  const item = cards[(currentIndex() + 1) % cards.length];
  const alreadySaved = activeSavedIds().includes(item.id);
  nextCardReady = false;
  elements.nextCardKind.textContent = alreadySaved ? '已收录' : item.kind;
  elements.nextCardWeather.hidden = activeMode === 'food';
  elements.nextCardWeather.textContent = item.weather || '';
  elements.nextCardTitle.textContent = item.title;
  elements.nextCardPrice.hidden = activeMode === 'food' || !item.price;
  elements.nextCardPrice.textContent = activeMode === 'food' ? '' : (item.price || '');
  elements.nextCardArea.textContent = item.area;
  elements.nextCardImage.onload = () => {
    nextCardReady = true;
    if (!animating) elements.skipButton.disabled = false;
  };
  elements.nextCardImage.onerror = () => {
    nextCardReady = false;
    elements.skipButton.disabled = true;
  };
  elements.nextCardImage.style.objectFit = item.imageFit || 'cover';
  elements.nextCardImage.src = item.image;
  if (elements.nextCardImage.complete && elements.nextCardImage.naturalWidth > 0) {
    nextCardReady = true;
    elements.skipButton.disabled = false;
  }
}

function renderSavedPreview() {
  const cards = activeCards();
  const saved = activeSavedIds().map((id) => getCard(cards, id)).filter(Boolean);
  const filled = saved.map((item) => `
    <div class="saved-thumb" title="${escapeHtml(item.title)}">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
      <button type="button" data-remove-saved="${escapeHtml(item.id)}" aria-label="取消收录${escapeHtml(item.title)}">×</button>
    </div>`).join('');
  const empty = Array.from({ length: MAX_SAVED - saved.length }, () => '<span class="saved-slot" aria-hidden="true"></span>').join('');
  elements.savedPreview.innerHTML = filled + empty;
  elements.savedCounter.innerHTML = `<span>已收录</span><b>${saved.length}/${MAX_SAVED}</b>`;

  elements.reviewButton.hidden = saved.length === 0;
  elements.reviewButton.textContent = activeMode === 'food'
    ? `选好了 · 保留 ${saved.length} 个美食`
    : `选好了 · 保留 ${saved.length} 个地点`;
  elements.saveButton.disabled = saved.length >= MAX_SAVED || saved.some((item) => item.id === currentCard().id);
}


function pullBackPrevious() {
  if (animating) return;
  animating = true;
  lastTouchTap = null;
  elements.deck.classList.remove('is-dragging');

  // Update state to previous card
  const cards = activeCards();
  setCurrentIndex((currentIndex() - 1 + cards.length) % cards.length);
  saveState();

  // Render updates the DOM and flushes layout (thanks to our previous patch)
  renderCard();

  // Instantly place it off-screen left
  elements.card.style.transition = 'none';
  elements.card.style.transform = 'translateX(-132%) rotate(-13deg)';
  elements.card.style.opacity = '0';
  void elements.card.offsetHeight; // force flush

  // Animate it in to the center
  elements.card.style.transition = 'transform 220ms ease, opacity 220ms ease';
  elements.card.style.transform = '';
  elements.card.style.opacity = '';

  const delay = reducedMotion.matches ? 15 : 245;
  transitionTimer = window.setTimeout(() => {
    animating = false;
    elements.card.style.transition = '';
  }, delay);
}

function skipCurrent(visualDirection = -1) {
  if (animating || !nextCardReady) return;
  animating = true;
  lastTouchTap = null;
  elements.deck.classList.remove('is-dragging');
  elements.deck.classList.add('is-advancing');
  elements.card.classList.add('flying');
  setNextCardProgress(1);
  elements.card.style.transform = `translateX(${visualDirection < 0 ? '-132%' : '132%'}) rotate(${visualDirection < 0 ? '-13deg' : '13deg'})`;
  elements.card.style.opacity = '0';
  const delay = reducedMotion.matches ? 15 : 245;
  transitionTimer = window.setTimeout(() => {
    setCurrentIndex(nextAvailableIndex(currentIndex() + 1));
    saveState();
    animating = false;
    renderCard();
  }, delay);
}

function collectCurrent() {
  if (animating) return;
  const item = currentCard();
  const saved = activeSavedIds();
  if (saved.includes(item.id)) {
    showToast('这个已经收录');
    return;
  }
  if (saved.length >= MAX_SAVED) {
    showToast('最多收录 3 个备选');
    return;
  }

  saved.push(item.id);
  saveState();
  animating = true;
  elements.collectBurst.classList.remove('show');
  void elements.collectBurst.offsetWidth;
  elements.collectBurst.classList.add('show');
  renderSavedPreview();
  showToast(`已收录 ${saved.length}/${MAX_SAVED}`);

  // 让卡片向右飞出，同时底下的卡片放大
  elements.deck.classList.remove('is-dragging');
  elements.deck.classList.add('is-advancing');
  elements.card.classList.add('flying');
  setNextCardProgress(1);
  elements.card.style.transform = `translateX(132%) rotate(13deg)`;
  elements.card.style.opacity = '0';

  const delay = reducedMotion.matches ? 120 : 650;
  transitionTimer = window.setTimeout(() => {
    animating = false;
    if (saved.length >= MAX_SAVED) {
      if (activeMode === 'food') setStage('play');
      else setStage('complete');
      return;
    }
    setCurrentIndex(nextAvailableIndex(currentIndex() + 1));
    saveState();
    renderCard();
  }, delay);
}

function removeSaved(id) {
  if (activeMode === 'food') {
    state.foodSaved = state.foodSaved.filter((value) => value !== id);
  } else {
    state.playSaved = state.playSaved.filter((value) => value !== id);
  }
  saveState();
  normalizeCurrentIndex();
  renderCard();
  renderSavedPreview();
  showToast('已取消收录');
}

function renderComplete() {
  const foods = state.foodSaved.map((id) => getCard(foodCards, id)).filter(Boolean);
  const play = state.playSaved.map((id) => getCard(playCards, id)).filter(Boolean);
  if (foods.length === 0) {
    setStage('food');
    return;
  }
  if (play.length === 0) {
    setStage('play');
    return;
  }

  const foodNames = foods.map((item) => item.title).join(' / ');
  const playNames = play.map((item) => `${item.title}（${item.weather}）`).join(' / ');
  const timeline = [
    { time: '00:00', title: '下班，去酒店休息', detail: '南山出发 · 酒店名字不显示' },
    { time: '12:00', title: '睡醒，慢慢出门', detail: '不用赶时间' },
    { time: '12:45', title: '午饭备选', detail: foodNames },
    { time: '14:00', title: '买一束小花', detail: '沿路花店 · 选一束轻轻松松的小花' },
    { time: '15:00', title: '下午去玩', detail: playNames }
  ];

  elements.finalTimeline.innerHTML = timeline.map((item) => `
    <li><time>${escapeHtml(item.time)}</time><span class="timeline-dot" aria-hidden="true"></span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.detail)}</p></div></li>`).join('');
  renderWishSummary();
}

function renderWishSummary() {
  const entries = [
    ['想吃', state.wishes.eat],
    ['想喝', state.wishes.drink],
    ['想去', state.wishes.go]
  ].filter(([, value]) => value.trim());

  elements.wishSummary.hidden = entries.length === 0;
  elements.wishSummary.replaceChildren();
  if (entries.length === 0) return;

  const title = document.createElement('h2');
  title.textContent = '她写下的小想法';
  elements.wishSummary.append(title);
  entries.forEach(([label, value]) => {
    const line = document.createElement('p');
    line.textContent = `${label}：${value}`;
    elements.wishSummary.append(line);
  });
}

function goBack() {
  if (visibleStage === 'food') setStage('intro', { persist: false });
  else if (visibleStage === 'play') setStage('food');
  else if (visibleStage === 'complete') setStage('play');
}

function resetState() {
  const confirmed = window.confirm('清空已经收录的美食和地点，重新开始吗？');
  if (!confirmed) return;
  const wishes = { ...state.wishes };
  state = cloneInitialState();
  state.wishes = wishes;
  saveState();
  setStage('intro');
  showToast('已清空选择');
}

function openIdeaDialog() {
  elements.wishEat.value = state.wishes.eat;
  elements.wishDrink.value = state.wishes.drink;
  elements.wishGo.value = state.wishes.go;
  elements.ideaDialog.showModal();
}

function saveIdeas(event) {
  event.preventDefault();
  state.wishes = {
    eat: elements.wishEat.value.trim(),
    drink: elements.wishDrink.value.trim(),
    go: elements.wishGo.value.trim()
  };
  saveState();
  elements.ideaDialog.close();
  if (visibleStage === 'complete') renderWishSummary();
  showToast('想法已保存');
}

elements.startButton.addEventListener('click', () => setStage('food'));
elements.resumeButton.addEventListener('click', () => setStage(state.stage === 'intro' ? 'food' : state.stage));
elements.backButton.addEventListener('click', goBack);
elements.homeLink.addEventListener('click', (event) => {
  event.preventDefault();
  setStage('intro', { persist: false });
});
elements.ideaButton.addEventListener('click', openIdeaDialog);
elements.skipButton.addEventListener('click', () => skipCurrent(-1));
elements.saveButton.addEventListener('click', collectCurrent);
elements.reviewButton.addEventListener('click', () => {
  if (activeSavedIds().length === 0) return;
  setStage(activeMode === 'food' ? 'play' : 'complete');
});
elements.editPlanButton.addEventListener('click', () => setStage('food'));
elements.restartButton.addEventListener('click', resetState);
elements.closeIdeaDialog.addEventListener('click', () => elements.ideaDialog.close());
elements.ideaForm.addEventListener('submit', saveIdeas);
elements.ideaDialog.addEventListener('click', (event) => {
  if (event.target === elements.ideaDialog) elements.ideaDialog.close();
});

elements.savedPreview.addEventListener('click', (event) => {
  const button = event.target.closest('[data-remove-saved]');
  if (button) removeSaved(button.dataset.removeSaved);
});

elements.card.addEventListener('dblclick', (event) => {
  event.preventDefault();
  collectCurrent();
});

elements.card.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    skipCurrent(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    skipCurrent(1);
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    collectCurrent();
  }
});

elements.card.addEventListener('pointerdown', (event) => {
  if (animating || !nextCardReady || event.button > 0) return;
  const item = currentCard();
  pointerStart = {
    id: event.pointerId,
    type: event.pointerType,
    x: event.clientX,
    y: event.clientY,
    time: performance.now(),
    cardId: item.id,
    axis: null
  };
  elements.card.setPointerCapture(event.pointerId);
  elements.card.classList.add('dragging');
  elements.deck.classList.add('is-dragging');
});

elements.card.addEventListener('pointermove', (event) => {
  if (!pointerStart || pointerStart.id !== event.pointerId) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  if (!pointerStart.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 9) {
    pointerStart.axis = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
  }
  if (pointerStart.axis === 'horizontal') {
    event.preventDefault();
    elements.card.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg)`;
    setNextCardProgress(Math.abs(dx) / (elements.card.clientWidth * 0.7));
  }
});

function finishPointer(event) {
  if (!pointerStart || pointerStart.id !== event.pointerId) return;
  const start = pointerStart;
  const dx = event.clientX - start.x;
  const dy = event.clientY - start.y;
  const elapsed = Math.max(performance.now() - start.time, 1);
  const velocity = Math.abs(dx) / elapsed;
  pointerStart = null;
  elements.card.classList.remove('dragging');
  elements.deck.classList.remove('is-dragging');

  if (start.axis === 'horizontal' && (Math.abs(dx) > 62 || (Math.abs(dx) > 30 && velocity > 0.45))) {
    if (dx > 0) { skipCurrent(1, false); } else { pullBackPrevious(); }
    return;
  }

  elements.card.style.transform = '';
  setNextCardProgress(0);

  const isTap = Math.abs(dx) < 9 && Math.abs(dy) < 9 && elapsed < 260;
  if (!isTap) return;
  const now = performance.now();
  const sameTap = lastTouchTap
    && lastTouchTap.cardId === start.cardId
    && now - lastTouchTap.time < 320
    && Math.hypot(event.clientX - lastTouchTap.x, event.clientY - lastTouchTap.y) < 24;
  if (sameTap) {
    lastTouchTap = null;
    collectCurrent();
  } else {
    lastTouchTap = { time: now, x: event.clientX, y: event.clientY, cardId: start.cardId };
  }
}

elements.card.addEventListener('pointerup', finishPointer);
elements.card.addEventListener('pointercancel', () => {
  pointerStart = null;
  lastTouchTap = null;
  elements.card.classList.remove('dragging');
  elements.deck.classList.remove('is-dragging');
  elements.card.style.transform = '';
  setNextCardProgress(0);
});

setStage(state.stage, { persist: false, focus: false });
