export type TrophicLevel = 
  | 'producer'      // Sinh vật sản xuất (cây cối, hoa sen, tảo rong)
  | 'primary_consumer'   // Sinh vật tiêu thụ bậc 1 (côn trùng ăn lá, ốc)
  | 'secondary_consumer' // Sinh vật tiêu thụ bậc 2 (cá săn mồi, ếch, chim bói cá)
  | 'decomposer';   // Sinh vật phân giải (nấm rừng, vi sinh vật)

export type EcoZone = 
  | 'canopy'     // Tầng tán rừng (cành cây cao, tổ chim)
  | 'understory' // Tầng cây bụi & thân cây (hoa dại, bọ rùa)
  | 'bank'       // Tầng bờ ao & thảm cỏ (bụi sậy, thân gỗ mục, ếch)
  | 'surface'    // Tầng mặt nước (hoa sen, chuồn chuồn)
  | 'benthic';   // Tầng dưới nước & đáy ao (cá, rong rêu, sỏi đá)

export interface Organism {
  id: string;
  name: string;
  vietnameseName: string;
  scientificName: string;
  category: 'côn trùng' | 'chim' | 'lưỡng cư' | 'cá' | 'nấm' | 'thực vật' | 'thực vật thủy sinh';
  trophicLevel: TrophicLevel;
  trophicLevelName: string;
  zone: EcoZone;
  zoneName: string;
  xPercent: number; // 0 - 100 percentage in the 16:9 illustration
  yPercent: number; // 0 - 100 percentage
  widthPercent: number;
  heightPercent: number;
  clueBadge: {
    iconType: 'bird' | 'bug' | 'plant' | 'mushroom' | 'fish' | 'frog' | 'ripple' | 'footprint';
    xOffset: number; // relative offset for badge in SVG
    yOffset: number;
    hintText: string;
  };
  description: string;
  adaptation: string; // Tập tính & đặc điểm thích nghi
  foodSource: string; // Thức ăn / Nguồn năng lượng
  preyOrPredator: string; // Mối liên hệ chuỗi thức ăn
  ecologicalImportance: string; // Vai trò với môi trường
  funFact: string;
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type AppMode = 
  | 'explore'      // Khám phá tự do
  | 'hunt'         // Trò chơi truy tìm sinh vật (0/8)
  | 'magnifier'    // Kính lúp tương tác soi chi tiết
  | 'layers'       // Hiển thị phân tầng sinh thái
  | 'food_chain'   // Sơ đồ chuỗi thức ăn tương tác
  | 'clean_canvas';// Chế độ thuần minh họa (không chữ, không ký tự, tối ưu chiếu bảng)
