import { Organism } from '../types/ecosystem';

export const ORGANISMS: Organism[] = [
  {
    id: 'kingfisher',
    name: 'Kingfisher',
    vietnameseName: 'Chim Bói Cá',
    scientificName: 'Alcedo atthis',
    category: 'chim',
    trophicLevel: 'secondary_consumer',
    trophicLevelName: 'Sinh vật tiêu thụ bậc 2 (Ăn thịt)',
    zone: 'canopy',
    zoneName: 'Tầng Tán Rừng & Cành Cây',
    xPercent: 19.5,
    yPercent: 18.5,
    widthPercent: 9,
    heightPercent: 14,
    clueBadge: {
      iconType: 'bird',
      xOffset: 8.5,
      yOffset: -7.5,
      hintText: 'Một bóng chim đang chăm chú rình mồi trên cành cây!',
    },
    description: 'Loài chim có bộ lông xanh ngọc bích rực rỡ và phần ngực màu cam sáng chói lọi. Chúng thường đậu tĩnh lặng trên các cành cây chìa ra mặt nước để quan sát cá bơi dưới nước.',
    adaptation: 'Mỏ nhọn như ngọn giáo giúp xé nước khi lao xuống bắt cá mà không gây bắn toé nước nhiều; đôi mắt đặc biệt có hai thấu kính giúp nhìn rõ con mồi khúc xạ dưới nước.',
    foodSource: 'Cá nhỏ, nòng nọc, ấu trùng chuồn chuồn dưới ao.',
    preyOrPredator: 'Kẻ săn mồi đỉnh cao trong hệ sinh thái ao nhỏ, giúp cân bằng số lượng cá con và côn trùng thủy sinh.',
    ecologicalImportance: 'Là chỉ thị sinh học quý giá: chim bói cá chỉ sinh sống ở những nơi có nguồn nước trong sạch và giàu cá tôm.',
    funFact: 'Vận tốc lao xuống nước của chim bói cá có thể đạt tới 40 km/h chỉ trong một cái chớp mắt!',
    quickQuiz: {
      question: 'Chim bói cá sử dụng đặc điểm nào để bắt cá chính xác dưới nước?',
      options: [
        'Mỏ nhọn hình giáo và mắt tinh tường bù khúc xạ nước',
        'Màng chân vịt để bơi lặn như vịt trời',
        'Bộ lông màu xanh để ngụy trang dưới đáy bùn',
        'Tiếng kêu siêu âm để định vị con cá'
      ],
      correctIndex: 0,
      explanation: 'Chim bói cá sở hữu mỏ khí động học và thị giác điều chỉnh đặc biệt giúp nó nhìn chuẩn vị trí con cá dù ánh sáng bị bẻ cong qua mặt nước.'
    }
  },
  {
    id: 'ladybug',
    name: 'Seven-spot Ladybird',
    vietnameseName: 'Bọ Rùa 7 Sao',
    scientificName: 'Coccinella septempunctata',
    category: 'côn trùng',
    trophicLevel: 'secondary_consumer',
    trophicLevelName: 'Sinh vật tiêu thụ (Thiên địch có ích)',
    zone: 'understory',
    zoneName: 'Tầng Cây Bụi & Tán Lá Thấp',
    xPercent: 18.8,
    yPercent: 67.2,
    widthPercent: 8,
    heightPercent: 10,
    clueBadge: {
      iconType: 'bug',
      xOffset: -2,
      yOffset: 18,
      hintText: 'Biểu tượng côn trùng: chú bọ rực rỡ ẩn trên chiếc lá xanh!',
    },
    description: 'Loài bọ cánh cứng nhỏ nhắn với đôi cánh trước biến thành lớp giáp cứng màu đỏ tươi điểm đúng 7 chấm đen tròn đối xứng.',
    adaptation: 'Màu đỏ tươi và chấm đen là "màu sắc cảnh báo" (aposematism) báo hiệu cho chim chóc rằng thịt của nó có vị rất đắng cay và hôi; khi gặp nguy hiểm có thể tiết chất dịch vàng để tự vệ.',
    foodSource: 'Rệp cây, rầy mềm phá hoại mùa màng và trứng sâu hại.',
    preyOrPredator: 'Kẻ săn mồi tí hon ăn rệp cây; là con mồi của chim nhỏ và nhện.',
    ecologicalImportance: 'Được mệnh danh là "bác sĩ của khu vườn", giúp bảo vệ cây rừng tự nhiên mà không cần thuốc hóa học.',
    funFact: 'Một con bọ rùa trong suốt cuộc đời có thể tiêu diệt tới 5.000 con rệp cây gây hại!',
    quickQuiz: {
      question: 'Tại sao bọ rùa lại có màu đỏ tươi nổi bật thay vì ngụy trang xanh lá?',
      options: [
        'Để hấp thụ ánh sáng mặt trời sưởi ấm',
        'Màu sắc cảnh báo kẻ săn mồi rằng nó có vị cay đắng',
        'Do bọ rùa thích khoe vẻ đẹp với bạn tình',
        'Để giả làm cánh hoa dại'
      ],
      correctIndex: 1,
      explanation: 'Trong sinh học, màu sắc nổi bật như đỏ hoặc vàng chấm đen gọi là hiện tượng cảnh báo tự nhiên (Aposematism).'
    }
  },
  {
    id: 'carp',
    name: 'Freshwater Carp',
    vietnameseName: 'Cá Chép Nước Ngọt',
    scientificName: 'Cyprinus carpio',
    category: 'cá',
    trophicLevel: 'primary_consumer',
    trophicLevelName: 'Sinh vật tiêu thụ bậc 1 (Ăn tạp)',
    zone: 'benthic',
    zoneName: 'Tầng Nước Trong & Đáy Ao',
    xPercent: 62.5,
    yPercent: 79.5,
    widthPercent: 16,
    heightPercent: 11,
    clueBadge: {
      iconType: 'fish',
      xOffset: -16,
      yOffset: 4,
      hintText: 'Gợi ý hình con cá: Sinh vật bơi lội dưới làn nước trong vắt!',
    },
    description: 'Loài cá nước ngọt với lớp vảy óng ánh bạc pha vàng đồng, vây lưng dài và cặp râu cảm giác ở khóe miệng giúp dò tìm thức ăn đáy ao.',
    adaptation: 'Thân hình thoi thuôn dài rẽ nước, vây đuôi khoẻ tạo lực đẩy, mang cá lọc oxy hòa tan trong nước, cặp râu nhạy cảm phát hiện thức ăn trong bùn cát.',
    foodSource: 'Rong rêu, ấu trùng phù du, vụn hữu cơ và giun đất rơi xuống nước.',
    preyOrPredator: 'Ăn thực vật thủy sinh và sinh vật nhỏ; là thức ăn quan trọng của chim bói cá và động vật săn mồi trên bờ.',
    ecologicalImportance: 'Góp phần dọn sạch bùn đáy ao và kiểm soát sự phát triển quá mức của tảo.',
    funFact: 'Cá chép có các cơ quan cảm giác xúc giác và vị giác nằm ngay trên cặp râu của nó!',
    quickQuiz: {
      question: 'Cá chép hô hấp bằng bộ phận nào dưới nước?',
      options: [
        'Mang cá để lọc oxy hòa tan trong nước',
        'Phổi như các loài thú trên cạn',
        'Da và vảy trên lưng',
        'Cặp râu ở khóe miệng'
      ],
      correctIndex: 0,
      explanation: 'Mang cá chứa vô số mao mạch máu mỏng, khi nước chảy qua mang, oxy được hấp thụ trực tiếp vào dòng máu.'
    }
  },
  {
    id: 'frog',
    name: 'Green Tree & Pond Frog',
    vietnameseName: 'Ếch Đồng Xanh',
    scientificName: 'Hylarana erythraea',
    category: 'lưỡng cư',
    trophicLevel: 'secondary_consumer',
    trophicLevelName: 'Sinh vật tiêu thụ bậc 2 (Lưỡng cư)',
    zone: 'bank',
    zoneName: 'Bờ Ao & Thảm Sậy Ẩn Nấp',
    xPercent: 92.5,
    yPercent: 78.5,
    widthPercent: 7.5,
    heightPercent: 8,
    clueBadge: {
      iconType: 'frog',
      xOffset: -6,
      yOffset: -12,
      hintText: 'Đố bạn tìm thấy đôi mắt tròn xoe ẩn sau bụi cỏ xanh!',
    },
    description: 'Loài lưỡng cư khéo léo nép mình trong đám cỏ lau sậy cạnh mép nước, lớp da xanh mướt đốm đen ngụy trang hoàn hảo với phiến lá.',
    adaptation: 'Da ẩm ướt hỗ trợ hô hấp phụ; chân sau dài có cơ bắp khỏe và màng bơi giúp phóng nhảy xa trên cạn và bơi nhanh dưới nước; lưỡi dính phóng ra chớp nhoáng bắt mồi.',
    foodSource: 'Ruồi, muỗi, chuồn chuồn, châu chấu và sâu bọ ven bờ.',
    preyOrPredator: 'Tiêu thụ côn trùng; là thức ăn của rắn nước, chim săn mồi và cá lớn.',
    ecologicalImportance: 'Cầu nối năng lượng quan trọng giữa hệ sinh thái cạn (rừng) và hệ sinh thái nước (ao).',
    funFact: 'Ếch có thể uống nước bằng chính làn da của mình mà không cần mở miệng uống nước!',
    quickQuiz: {
      question: 'Tại sao ếch được gọi là động vật "lưỡng cư"?',
      options: [
        'Vì chúng có thể sống cả trên cạn lẫn dưới môi trường nước',
        'Vì chúng có hai màu da thay đổi ngày và đêm',
        'Vì chúng vừa ăn cỏ vừa ăn thịt',
        'Vì chúng sống trên ngọn cây cao'
      ],
      correctIndex: 0,
      explanation: 'Lưỡng cư (Amphibian) nghĩa là "hai cuộc sống": ấu trùng (nòng nọc) sống dưới nước thở bằng mang, khi trưởng thành lên bờ thở bằng phổi và da.'
    }
  },
  {
    id: 'mushrooms',
    name: 'Forest Log Mushrooms',
    vietnameseName: 'Cụm Nấm Rừng Gỗ Mục',
    scientificName: 'Mycena / Armillaria',
    category: 'nấm',
    trophicLevel: 'decomposer',
    trophicLevelName: 'Sinh vật phân giải (Tái sinh đất rừng)',
    zone: 'bank',
    zoneName: 'Thân Gỗ Mục & Đất Ẩm',
    xPercent: 86.5,
    yPercent: 44.5,
    widthPercent: 11,
    heightPercent: 12,
    clueBadge: {
      iconType: 'mushroom',
      xOffset: 7,
      yOffset: -6,
      hintText: 'Biểu tượng nấm: Cụm nấm ấm áp mọc trên thân cây gỗ mục!',
    },
    description: 'Những cây nấm với chiếc mũ hình bán cầu màu nâu nhạt xếp tầng bên thân gỗ mục, tỏa sợi nấm ngầm len lỏi bên trong lớp vỏ cây phong rêu.',
    adaptation: 'Hệ sợi nấm (mycelium) tiết ra các enzyme đặc biệt phân hủy chất gỗ cứng (lignin và cellulose) mà động vật không thể tiêu hóa được.',
    foodSource: 'Thân cây gỗ mục, lá khô và chất hữu cơ phân hủy.',
    preyOrPredator: 'Cung cấp thức ăn cho ốc sên, bọ cánh cứng và ấu trùng côn trùng.',
    ecologicalImportance: 'Đóng vai trò tái chế tối thượng: chuyển hóa cây chết thành mùn đất màu mỡ nuôi dưỡng hạt mầm non của khu rừng.',
    funFact: 'Nấm không phải là thực vật vì chúng không thể quang hợp mà thuộc một giới sinh vật riêng biệt!',
    quickQuiz: {
      question: 'Vai trò cốt lõi của nấm rừng trong hệ sinh thái là gì?',
      options: [
        'Phân giải xác sinh vật chết thành chất dinh dưỡng cho đất',
        'Quang hợp tạo ra khí oxy cho động vật',
        'Săn bắt côn trùng nhỏ làm thức ăn',
        'Hút nước từ ao lên ngọn cây cao'
      ],
      correctIndex: 0,
      explanation: 'Nấm là "những nhà tái chế tài ba" của thiên nhiên, thiếu sinh vật phân giải thì Trái Đất sẽ ngập tràn xác cây cối mục nát.'
    }
  },
  {
    id: 'lotus',
    name: 'Water Lily & Lotus',
    vietnameseName: 'Hoa Súng & Lá Sen Nổi',
    scientificName: 'Nymphaea alba',
    category: 'thực vật thủy sinh',
    trophicLevel: 'producer',
    trophicLevelName: 'Sinh vật sản xuất (Thực vật nổi)',
    zone: 'surface',
    zoneName: 'Mặt Nước Ao Đầm',
    xPercent: 55.5,
    yPercent: 58.5,
    widthPercent: 18,
    heightPercent: 11,
    clueBadge: {
      iconType: 'ripple',
      xOffset: -8,
      yOffset: -8,
      hintText: 'Gợn sóng lăn tăn và cánh hoa sen hồng hé nở đón ánh nắng!',
    },
    description: 'Bông hoa màu hồng phớt tinh khôi với nhị vàng rực rỡ, bao quanh bởi những phiến lá tròn xanh ngắt bồng bềnh trên mặt nước tạo bóng râm dịu mát.',
    adaptation: 'Cuống lá xốp chứa các khoang khí giúp nổi trên mặt nước; bề mặt lá có lớp sáp siêu mỏng chống ướt (hiệu ứng lá sen); rễ bám sâu vào bùn giàu dinh dưỡng.',
    foodSource: 'Quang hợp từ ánh sáng mặt trời, hấp thụ nước và khoáng chất bùn ao.',
    preyOrPredator: 'Cung cấp nơi trú ngụ an toàn cho cá nhỏ, ốc sên và làm bệ đáp cho chuồn chuồn, ếch.',
    ecologicalImportance: 'Cung cấp oxy cho tầng mặt nước, che chắn bớt ánh nắng gắt giúp nước ao không bị quá nóng vào trưa hè.',
    funFact: 'Lá sen có khả năng "tự làm sạch": các hạt nước lăn tròn sẽ cuốn trôi mọi bụi bẩn mà không hề làm ướt phiến lá!',
    quickQuiz: {
      question: 'Nhờ cấu tạo nào mà lá sen có thể nổi bồng bềnh trên mặt nước ao?',
      options: [
        'Có các khoang rỗng chứa đầy không khí bên trong cuống lá',
        'Nhờ lá có cánh quạt đẩy nước',
        'Do lá sen được làm từ gỗ khô',
        'Vì nước ao có muối biển rất mặn'
      ],
      correctIndex: 0,
      explanation: 'Hệ thống khoang khí (aerenchyma) bên trong thân và cuống lá tạo sức nổi tự nhiên giúp hoa và lá vươn lên đón nắng mặt trời.'
    }
  },
  {
    id: 'ancient_tree',
    name: 'Ancient Tree & Wildflowers',
    vietnameseName: 'Cây Rừng Cổ Thụ & Hoa Trắng',
    scientificName: 'Quercus robur / Wildflowers',
    category: 'thực vật',
    trophicLevel: 'producer',
    trophicLevelName: 'Sinh vật sản xuất sơ cấp (Trụ cột rừng)',
    zone: 'understory',
    zoneName: 'Tầng Cây Cổ Thụ & Bờ Đất Rừng',
    xPercent: 8.5,
    yPercent: 42.0,
    widthPercent: 15,
    heightPercent: 35,
    clueBadge: {
      iconType: 'plant',
      xOffset: 12,
      yOffset: 3,
      hintText: 'Biểu tượng cành lá: Thân cây cổ thụ và những đóa hoa trắng tinh!',
    },
    description: 'Thân cây đại thụ vạm vỡ với lớp vỏ xù xì phong trần, cành lá tỏa bóng sum suê che chở cho cả một góc ao, bên dưới gốc là bụi hoa dại nở cánh trắng nhụy vàng.',
    adaptation: 'Rễ cọc cắm sâu giữ đất chống xói mòn bờ ao; tán lá rộng đón quang hợp tối đa; hoa dại tiết mật ngọt thu hút ong bướm thụ phấn.',
    foodSource: 'Quang hợp nhờ diệp lục tố, hấp thu nước và khoáng chất từ đất ẩm.',
    preyOrPredator: 'Nền tảng sự sống: cung cấp thức ăn, nơi làm tổ, bóng mát cho hàng chục loài sinh vật từ chim muông đến côn trùng.',
    ecologicalImportance: 'Sản xuất khí oxy trong lành, giữ nguồn nước ngầm và điều hòa tiểu khí hậu mát mẻ cho cả khu vực ao rừng.',
    funFact: 'Một cây cổ thụ trưởng thành có thể tạo ra lượng oxy đủ cho 4 người hít thở suốt một năm!',
    quickQuiz: {
      question: 'Trong chuỗi thức ăn sinh thái, cây xanh được xếp vào nhóm nào?',
      options: [
        'Sinh vật sản xuất tự dưỡng qua quá trình quang hợp',
        'Sinh vật tiêu thụ thịt',
        'Sinh vật phân giải rác thải',
        'Sinh vật ký sinh'
      ],
      correctIndex: 0,
      explanation: 'Cây xanh tự tổng hợp chất hữu cơ nuôi sống bản thân và toàn bộ sinh giới bằng năng lượng ánh sáng mặt trời.'
    }
  },
  {
    id: 'dragonfly',
    name: 'Meadow Dragonfly',
    vietnameseName: 'Chuồn Chuồn Đầm Ao',
    scientificName: 'Sympetrum / Aeshna',
    category: 'côn trùng',
    trophicLevel: 'secondary_consumer',
    trophicLevelName: 'Sinh vật tiêu thụ (Phi công săn mồi)',
    zone: 'surface',
    zoneName: 'Mặt Nước & Không Gian Mở',
    xPercent: 47.0,
    yPercent: 38.0,
    widthPercent: 6,
    heightPercent: 6,
    clueBadge: {
      iconType: 'footprint',
      xOffset: -8,
      yOffset: -8,
      hintText: 'Dấu vết đôi cánh trong suốt chao liệng đón gió mát!',
    },
    description: 'Loài côn trùng bay lượn tài tình với 4 cánh mỏng trong suốt đan gân tinh xảo, thân thon dài rực rỡ và cặp mắt kép khổng lồ quan sát 360 độ.',
    adaptation: 'Bốn cánh có thể đập độc lập giúp chuồn chuồn có thể bay lùi, lộn nhào và đứng yên một chỗ trên không; tỷ lệ săn mồi thành công lên đến 95%.',
    foodSource: 'Muỗi, ruồi, bọ gậy và các loại sâu bọ bay lượn trên mặt ao.',
    preyOrPredator: 'Thiên địch số 1 của loài muỗi; là con mồi của chim bói cá và ếch khi bay thấp sát mặt nước.',
    ecologicalImportance: 'Giúp kiểm soát mật độ muỗi truyền bệnh một cách tự nhiên và bền vững.',
    funFact: 'Chuồn chuồn là một trong những loài sinh vật cổ xưa nhất Trái Đất, tổ tiên chúng đã bay lượn từ 300 triệu năm trước!',
    quickQuiz: {
      question: 'Đặc điểm nào giúp chuồn chuồn trở thành "tay săn mồi" cừ khôi trên không?',
      options: [
        'Mắt kép quan sát 360 độ và khả năng bay lơ lửng, đổi hướng tức thì',
        'Có nọc độc cực mạnh ở đuôi',
        'Bộ giáp nặng nề để húc đổ con mồi',
        'Khả năng ngụy trang dưới bùn'
      ],
      correctIndex: 0,
      explanation: 'Chuồn chuồn có thị giác gần như toàn cảnh và hệ cơ cánh tối tân cho phép tính toán quỹ đạo đón lõng con mồi trên không trung.'
    }
  }
];

export const ECO_ZONES = [
  {
    id: 'canopy',
    name: 'Tầng Tán Rừng & Cành Cao',
    color: 'emerald',
    description: 'Nơi đón nhận nhiều ánh sáng mặt trời nhất. Nơi làm tổ và quan sát của chim bói cá, chim sâu.',
    range: 'Độ cao 0 - 30% khung cảnh'
  },
  {
    id: 'understory',
    name: 'Tầng Cây Bụi & Thân Cây Cổ Thụ',
    color: 'amber',
    description: 'Nơi các loài hoa dại nở rộ, lá cây rậm rạp nuôi dưỡng bọ rùa, bọ cánh cứng, sâu bướm.',
    range: 'Độ cao 30% - 65% khung cảnh'
  },
  {
    id: 'bank',
    name: 'Bờ Ao, Bụi Sậy & Khối Gỗ Mục',
    color: 'lime',
    description: 'Vùng đệm ẩm ướt giao thoa đất và nước. Nơi ếch trú ẩn rình mồi và nấm rừng phân hủy gỗ mục.',
    range: 'Mép bờ và thềm cỏ ven nước'
  },
  {
    id: 'surface',
    name: 'Tầng Mặt Nước Thoáng',
    color: 'cyan',
    description: 'Không gian mở của hoa súng, lá sen nổi và đường bay săn mồi của chuồn chuồn.',
    range: 'Ranh giới mặt gương nước ao'
  },
  {
    id: 'benthic',
    name: 'Tầng Nước Trong & Đáy Ao',
    color: 'blue',
    description: 'Môi trường thủy sinh nơi cá chép bơi lội, rong đuôi chó cung cấp oxy và sỏi đá làm chỗ ẩn nấp.',
    range: 'Mặt cắt lòng ao sâu 60% - 100%'
  }
];

export const FOOD_CHAIN_STEPS = [
  {
    step: 1,
    role: 'Năng Lượng Sơ Cấp',
    name: 'Ánh Nắng Mặt Trời',
    type: 'energy',
    desc: 'Cung cấp năng lượng vô tận để thực vật quang hợp.'
  },
  {
    step: 2,
    role: 'Sinh Vật Sản Xuất',
    name: 'Cây Cổ Thụ & Rong Rêu & Hoa Sen',
    type: 'producer',
    desc: 'Hấp thụ ánh sáng, tạo ra chất hữu cơ và khí oxy.'
  },
  {
    step: 3,
    role: 'Sinh Vật Tiêu Thụ Bậc 1',
    name: 'Bọ Ăn Lá & Cá Ăn Rong',
    type: 'primary',
    desc: 'Ăn thực vật để lấy năng lượng lớn lên.'
  },
  {
    step: 4,
    role: 'Sinh Vật Tiêu Thụ Bậc 2',
    name: 'Bọ Rùa, Ếch & Chim Bói Cá',
    type: 'secondary',
    desc: 'Săn bắt côn trùng và cá nhỏ ven bờ ao.'
  },
  {
    step: 5,
    role: 'Sinh Vật Phân Giải',
    name: 'Cụm Nấm Rừng & Vi Sinh Vật',
    type: 'decomposer',
    desc: 'Phân giải xác sinh vật thành muối khoáng màu mỡ cho cây.'
  }
];
