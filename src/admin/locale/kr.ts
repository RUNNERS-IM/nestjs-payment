import dotenv from 'dotenv';

dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });

const translations = {
  actions: {
    new: '새로 생성',
    edit: '수정',
    show: '보기',
    delete: '삭제',
    bulkDelete: '모두 삭제',
    list: '리스트',
  },
  buttons: {
    save: '저장',
    addNewItem: '새로운 객체 추가',
    filter: '필터',
    applyChanges: '변경 적용',
    resetFilter: '초기화',
    confirmRemovalMany: '{{count}} 개의 기록을 지우는 것을 확인하세요',
    confirmRemovalMany_plural: '{{count}} 개의 기록들을 지우는 것을 확인하세요',
    logout: '로그아웃',
    login: '로그인',
    seeTheDocumentation: '보기: <1>도큐먼트</1>',
    createFirstRecord: '첫 번째 데이터를 생성하세요',
  },
  labels: {
    navigation: '내비게이션',
    pages: '페이지들',
    selectedRecords: '선택됨 ({{selected}})',
    filters: '필터',
    adminVersion: '관리자: {{version}}',
    appVersion: '앱: {{version}}',
    loginWelcome: `${process.env.SERVICE_TITLE || '어드민'}에 오신 것을 환영합니다!`,
    dashboard: '대시보드',
    UserEntity: '유저',
  },
  properties: {
    length: '길이',
    from: '에서',
    to: '로',
  },
  resources: {},
  messages: {
    successfullyBulkDeleted: '{{count}} 개 레코드를 성공적으로 제거했습니다',
    successfullyBulkDeleted_plural: '{{count}} 개의 레코드를 성공적으로 제거했습니다',
    successfullyDeleted: '주어진 레코드를 성공적으로 삭제했습니다',
    successfullyUpdated: '주어진 레코드를 성공적으로 업데이트했습니다',
    thereWereValidationErrors: '검증 오류가 있습니다. 아래에서 확인하세요',
    forbiddenError: '{{resourceId}}에서 {{actionName}} 작업을 수행할 수 없습니다',
    anyForbiddenError: '주어진 작업을 수행할 수 없습니다',
    successfullyCreated: '새 레코드를 성공적으로 생성했습니다',
    bulkDeleteError:
      '기록을 삭제하는 동안 오류가 발생했습니다. 자세한 정보를 보려면 콘솔을 확인하세요',
    errorFetchingRecords:
      '레코드를 가져오는 동안 오류가 발생했습니다. 자세한 정보를 보려면 콘솔을 확인하세요',
    errorFetchingRecord:
      '레코드를 가져오는 동안 오류가 발생했습니다. 자세한 정보를 보려면 콘솔을 확인하세요',
    noRecordsSelected: '선택한 레코드가 없습니다',
    theseRecordsWillBeRemoved: '다음 레코드가 제거됩니다',
    theseRecordsWillBeRemoved_plural: '다음 레코드는 제거됩니다',
    pickSomeFirstToRemove: '레코드를 제거하려면 먼저 레코드를 선택해야 합니다',
    error404Resource: '지정된 ID: {{resourceId}}의 리소스를 찾을 수 없습니다',
    error404Action:
      '지정된 ID의 리소스: {{resourceId}}에 이름이 {{actionName}}인 작업이 없거나 사용할 권한이 없습니다!',
    error404Record:
      '지정된 ID의 리소스: {{resourceId}}에 ID가 {{recordId}}인 레코드가 없거나 사용할 권한이 없습니다!',
    seeConsoleForMore: '자세한 내용은 개발 콘솔을 참조하세요...',
    noActionComponent: '액션에 대한 작업 구성 요소를 구현해야 합니다',
    noRecordsInResource: '이 리소스에 레코드가 없습니다',
    noRecords: '기록 없음',
    confirmDelete: '이 항목을 정말로 제거하시겠습니까?',
    welcomeOnBoard_title: '탑승을 환영합니다!',
    welcomeOnBoard_subtitle:
      '이제 당신은 우리 중 하나입니다! 시작하는 데 도움이 되는 몇 가지 팁을 준비했습니다.',
    loginWelcome: 'LAB Code 를 적용한 제품들을 관리할 수 있는 어드민입니다.',
    addingResources_title: '리소스 추가',
    addingResources_subtitle: '사이드바에 새 리소스를 추가하는 방법',
    customizeResources_title: '리소스 사용자 정의',
    customizeResources_subtitle: '동작 정의, 속성 추가 등...',
    customizeActions_title: '작업 사용자 정의',
    customizeActions_subtitle: '기존 작업 수정 및 새로 추가',
    writeOwnComponents_title: '구성 요소 쓰기',
    writeOwnComponents_subtitle: 'AdminJS의 모양과 느낌을 수정하는 방법',
    customDashboard_title: '맞춤 대시보드',
    customDashboard_subtitle: '이 보기를 수정하고 사이드바에 새 페이지를 추가하는 방법',
    roleBasedAccess_title: '역할 기반 액세스 제어',
    roleBasedAccess_subtitle: 'AdminJS에서 사용자 역할 및 권한 생성',
    community_title: 'slack 커뮤니티에 참여',
    community_subtitle: 'AdminJS의 작성자 및 다른 AdminJS 사용자와 대화',
    foundBug_title: '버그를 찾았습니까? 개선이 필요하십니까?',
    foundBug_subtitle: 'GitHub 저장소에 문제 제기',
    needMoreSolutions_title: '고급 솔루션이 필요하십니까?',
    needMoreSolutions_subtitle:
      '우리는 AdminJS를 기반으로 한 (뿐만 아니라) 아름다운 UX/UI 디자인과 맞춤형 소프트웨어를 제공하기 위해 왔습니다',
    invalidCredentials: '잘못된 이메일 또는 비밀번호입니다.',
  },
};

export default {
  language: 'kr',
  translations,
};
