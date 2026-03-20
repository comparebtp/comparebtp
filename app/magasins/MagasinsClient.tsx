"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Lazy load map (Leaflet needs window)
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);

// ─── TYPES ───────────────────────────────────────────────
type Store = {
  id: number;
  name: string;
  chain: string;
  address: string;
  city: string;
  dept: "06" | "83";
  lat: number;
  lng: number;
  specialty: string;
  website: string;
  hasPrices: boolean;
  color: string;
};

// ─── STORE DATA ──────────────────────────────────────────
const STORES: Store[] = [
  // ═══ LEROY MERLIN ═══
  { id:1, name:"Leroy Merlin Nice Lingostière", chain:"Leroy Merlin", address:"642 Boulevard du Mercantour", city:"Nice", dept:"06", lat:43.7102, lng:7.1928, specialty:"Généraliste BTP", website:"https://www.leroymerlin.fr", hasPrices:true, color:"#78BE20" },
  { id:2, name:"Leroy Merlin Vallauris-Antibes", chain:"Leroy Merlin", address:"Chemin des Fuguières", city:"Vallauris", dept:"06", lat:43.5770, lng:7.0540, specialty:"Généraliste BTP", website:"https://www.leroymerlin.fr", hasPrices:true, color:"#78BE20" },
  { id:3, name:"Leroy Merlin La Valette-du-Var", chain:"Leroy Merlin", address:"Rue des Commandos d'Afrique, ZA des Espaluns", city:"La Valette-du-Var", dept:"83", lat:43.1376, lng:5.9831, specialty:"Généraliste BTP", website:"https://www.leroymerlin.fr", hasPrices:true, color:"#78BE20" },
  { id:4, name:"Leroy Merlin Puget-sur-Argens", chain:"Leroy Merlin", address:"327 Boulevard Jean Moulin", city:"Puget-sur-Argens", dept:"83", lat:43.4550, lng:6.6870, specialty:"Généraliste BTP", website:"https://www.leroymerlin.fr", hasPrices:true, color:"#78BE20" },

  // ═══ CASTORAMA ═══
  { id:5, name:"Castorama Nice Lingostière", chain:"Castorama", address:"ZAC Forum Lingostière, Chemin Auda", city:"Nice", dept:"06", lat:43.7095, lng:7.1940, specialty:"Généraliste BTP", website:"https://www.castorama.fr", hasPrices:true, color:"#0066CC" },
  { id:6, name:"Castorama Le Cannet", chain:"Castorama", address:"Chemin de Camiraï", city:"Le Cannet", dept:"06", lat:43.5680, lng:7.0190, specialty:"Généraliste BTP", website:"https://www.castorama.fr", hasPrices:true, color:"#0066CC" },
  { id:7, name:"Castorama Mandelieu", chain:"Castorama", address:"Centre Commercial Géant, Route de Fréjus", city:"Mandelieu-la-Napoule", dept:"06", lat:43.5445, lng:6.9371, specialty:"Généraliste BTP", website:"https://www.castorama.fr", hasPrices:true, color:"#0066CC" },
  { id:8, name:"Castorama Antibes", chain:"Castorama", address:"Boulevard André Breton", city:"Antibes", dept:"06", lat:43.5900, lng:7.0800, specialty:"Généraliste BTP", website:"https://www.castorama.fr", hasPrices:true, color:"#0066CC" },
  { id:9, name:"Castorama La Garde", chain:"Castorama", address:"620 Avenue de Draguignan, ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1240, lng:6.0160, specialty:"Généraliste BTP", website:"https://www.castorama.fr", hasPrices:true, color:"#0066CC" },

  // ═══ BRICO DÉPÔT ═══
  { id:10, name:"Brico Dépôt Nice", chain:"Brico Dépôt", address:"ZAC Forum Lingostière, 15 Chemin Auda", city:"Nice", dept:"06", lat:43.7110, lng:7.1935, specialty:"Généraliste discount", website:"https://www.bricodepot.fr", hasPrices:true, color:"#E30613" },
  { id:11, name:"Brico Dépôt Toulon", chain:"Brico Dépôt", address:"Rue Sainte Claire Deville", city:"Toulon", dept:"83", lat:43.1200, lng:5.9150, specialty:"Généraliste discount", website:"https://www.bricodepot.fr", hasPrices:true, color:"#E30613" },

  // ═══ BRICORAMA ═══
  { id:12, name:"Bricorama Le Cannet", chain:"Bricorama", address:"110 Boulevard Carnot", city:"Le Cannet", dept:"06", lat:43.5700, lng:7.0200, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },

  // ═══ BRICOMARCHÉ ═══
  { id:13, name:"Bricomarché Saint-Laurent-du-Var", chain:"Bricomarché", address:"570 Avenue du Général de Gaulle", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Bricolage, jardin", website:"https://www.bricomarche.com", hasPrices:true, color:"#009639" },
  { id:14, name:"Bricomarché Gattières", chain:"Bricomarché", address:"211 Avenue de la Tourre", city:"Gattières", dept:"06", lat:43.7610, lng:7.1770, specialty:"Bricolage, jardin", website:"https://www.bricomarche.com", hasPrices:true, color:"#009639" },
  { id:15, name:"Bricomarché Villeneuve-Loubet", chain:"Bricomarché", address:"Chemin des Maurettes", city:"Villeneuve-Loubet", dept:"06", lat:43.6420, lng:7.1230, specialty:"Bricolage, jardin", website:"https://www.bricomarche.com", hasPrices:true, color:"#009639" },

  // ═══ MR BRICOLAGE (06) ═══
  { id:16, name:"Mr Bricolage Nice", chain:"Mr Bricolage", address:"17 Rue Barberis", city:"Nice", dept:"06", lat:43.7050, lng:7.2750, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:17, name:"Mr Bricolage Cros de Cagnes", chain:"Mr Bricolage", address:"95 Avenue Cyrille Besset", city:"Cagnes-sur-Mer", dept:"06", lat:43.6560, lng:7.1530, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:18, name:"Mr Bricolage Cagnes-sur-Mer", chain:"Mr Bricolage", address:"102 Avenue de Grasse", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:19, name:"Mr Bricolage Beaulieu-sur-Mer", chain:"Mr Bricolage", address:"1 Rue Georges Clemenceau", city:"Beaulieu-sur-Mer", dept:"06", lat:43.7070, lng:7.3320, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:20, name:"Mr Bricolage Antibes", chain:"Mr Bricolage", address:"9 Rue des Lits Militaires", city:"Antibes", dept:"06", lat:43.5804, lng:7.1251, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:21, name:"Mr Bricolage Cannes", chain:"Mr Bricolage", address:"8 Rue Louis Braille", city:"Cannes", dept:"06", lat:43.5560, lng:7.0170, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:22, name:"Mr Bricolage Le Rouret", chain:"Mr Bricolage", address:"905 Avenue de Grasse", city:"Le Rouret", dept:"06", lat:43.6710, lng:7.0050, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:23, name:"Mr Bricolage Mouans-Sartoux", chain:"Mr Bricolage", address:"570 Route de la Roquette", city:"Mouans-Sartoux", dept:"06", lat:43.6220, lng:6.9680, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:24, name:"Mr Bricolage Menton", chain:"Mr Bricolage", address:"780 Avenue Saint Roman", city:"Menton", dept:"06", lat:43.7747, lng:7.4975, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:25, name:"Mr Bricolage Peymeinade", chain:"Mr Bricolage", address:"98 Avenue de Boutigny", city:"Peymeinade", dept:"06", lat:43.6420, lng:6.8780, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:26, name:"Mr Bricolage Vence", chain:"Mr Bricolage", address:"800 Avenue Rhin et Danube", city:"Vence", dept:"06", lat:43.7220, lng:7.1120, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  // ═══ MR BRICOLAGE (83) ═══
  { id:27, name:"Mr Bricolage Le Pradet", chain:"Mr Bricolage", address:"Avenue Ganzin, ZAC L'Esquirol", city:"Le Pradet", dept:"83", lat:43.1050, lng:6.0250, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:28, name:"Mr Bricolage Toulon Mourillon", chain:"Mr Bricolage", address:"538 Avenue de Lattre de Tassigny", city:"Toulon", dept:"83", lat:43.1180, lng:5.9450, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:29, name:"Mr Bricolage Toulon Aristide Briand", chain:"Mr Bricolage", address:"98 Avenue Aristide Briand", city:"Toulon", dept:"83", lat:43.1300, lng:5.9200, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:30, name:"Mr Bricolage Draguignan", chain:"Mr Bricolage", address:"150 Rue Lech Walessa, CC Les Hellènes", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:31, name:"Mr Bricolage Brignoles", chain:"Mr Bricolage", address:"Route Nationale 7, Quartier Saint Jean", city:"Brignoles", dept:"83", lat:43.4060, lng:6.0620, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:32, name:"Mr Bricolage Cavalaire-sur-Mer", chain:"Mr Bricolage", address:"134 Impasse des Chasseurs", city:"Cavalaire-sur-Mer", dept:"83", lat:43.1740, lng:6.5280, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:33, name:"Mr Bricolage Cogolin", chain:"Mr Bricolage", address:"Rue Marceau, Lieu-dit Le Raillet", city:"Cogolin", dept:"83", lat:43.2520, lng:6.5320, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:34, name:"Mr Bricolage Trans-en-Provence", chain:"Mr Bricolage", address:"Centre Commercial Carrefour", city:"Trans-en-Provence", dept:"83", lat:43.5000, lng:6.4860, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:35, name:"Mr Bricolage Vidauban", chain:"Mr Bricolage", address:"1 Avenue du Maréchal Foch", city:"Vidauban", dept:"83", lat:43.4250, lng:6.4310, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },
  { id:36, name:"Mr Bricolage Saint-Maximin", chain:"Mr Bricolage", address:"RN7 Route d'Aix", city:"Saint-Maximin-la-Sainte-Baume", dept:"83", lat:43.4530, lng:5.8620, specialty:"Bricolage proximité", website:"https://www.mr-bricolage.fr", hasPrices:true, color:"#E4002B" },

  // ═══ WÜRTH ═══
  { id:37, name:"Würth Proxishop Nice Nord", chain:"Würth", address:"916 Route de Turin", city:"Nice", dept:"06", lat:43.7280, lng:7.3020, specialty:"Outillage pro, visserie", website:"https://eshop.wurth.fr", hasPrices:true, color:"#CC0000" },
  { id:38, name:"Würth Proxishop Saint-Laurent-du-Var", chain:"Würth", address:"ZI Secteur A", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6750, lng:7.1720, specialty:"Outillage pro, visserie", website:"https://eshop.wurth.fr", hasPrices:true, color:"#CC0000" },
  { id:39, name:"Würth Proxishop Vallauris", chain:"Würth", address:"Chemin de Saint-Bernard", city:"Vallauris", dept:"06", lat:43.5800, lng:7.0550, specialty:"Outillage pro, visserie", website:"https://eshop.wurth.fr", hasPrices:true, color:"#CC0000" },
  { id:40, name:"Würth Proxishop La Garde", chain:"Würth", address:"ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Outillage pro, visserie", website:"https://eshop.wurth.fr", hasPrices:true, color:"#CC0000" },
  { id:41, name:"Würth Proxishop Six-Fours", chain:"Würth", address:"ZI Camp Laurent", city:"Six-Fours-les-Plages", dept:"83", lat:43.1010, lng:5.8420, specialty:"Outillage pro, visserie", website:"https://eshop.wurth.fr", hasPrices:true, color:"#CC0000" },

  // ═══ POINT P (06) ═══
  { id:42, name:"Point P Nice L'Ariane", chain:"Point P", address:"26 Chemin des Chênes Blancs", city:"Nice", dept:"06", lat:43.7260, lng:7.2980, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:43, name:"Point P Antibes", chain:"Point P", address:"2722 Avenue Jean Michard Pelissier", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:44, name:"Point P Cagnes-sur-Mer", chain:"Point P", address:"58 Rue de la Grange-Rimade", city:"Cagnes-sur-Mer", dept:"06", lat:43.6610, lng:7.1410, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:45, name:"Point P Menton", chain:"Point P", address:"115 Route Val des Castagnins", city:"Menton", dept:"06", lat:43.7770, lng:7.5010, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:46, name:"Point P Grasse", chain:"Point P", address:"34 Route de la Paoute", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:47, name:"Point P Contes", chain:"Point P", address:"Chemin de la Roseyre", city:"Contes", dept:"06", lat:43.8100, lng:7.3150, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:48, name:"Point P Pégomas", chain:"Point P", address:"2311 Route de la Fenerie", city:"Pégomas", dept:"06", lat:43.5980, lng:6.9340, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:49, name:"Point P Le Cannet", chain:"Point P", address:"Impasse des Fauvettes", city:"Le Cannet", dept:"06", lat:43.5700, lng:7.0150, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:50, name:"Point P Vallauris", chain:"Point P", address:"Chemin de Saint-Bernard", city:"Vallauris", dept:"06", lat:43.5790, lng:7.0530, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  // ═══ POINT P (83) ═══
  { id:51, name:"Point P Toulon Brosset", chain:"Point P", address:"225 Avenue du Général Brosset", city:"Toulon", dept:"83", lat:43.1270, lng:5.9310, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:52, name:"Point P Le Pradet", chain:"Point P", address:"Route de Carqueiranne, Quartier Esquirol", city:"Le Pradet", dept:"83", lat:43.1050, lng:6.0200, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:53, name:"Point P La Garde Carrelage", chain:"Point P", address:"189 Avenue de Draguignan", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Carrelage, revêtement", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:54, name:"Point P Draguignan", chain:"Point P", address:"Avenue des Vignerons", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },
  { id:55, name:"Point P Fréjus", chain:"Point P", address:"ZA des Lions", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Gros oeuvre, matériaux", website:"https://www.pointp.fr", hasPrices:false, color:"#F39200" },

  // ═══ CEDEO (06) ═══
  { id:56, name:"Cedeo Nice Ariane", chain:"Cedeo", address:"1 Rue Amédée VII Comte Rouge", city:"Nice", dept:"06", lat:43.7250, lng:7.2960, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:57, name:"Cedeo Antibes", chain:"Cedeo", address:"76 Avenue Philippe Rochat", city:"Antibes", dept:"06", lat:43.6090, lng:7.0730, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:58, name:"Cedeo Cagnes-sur-Mer", chain:"Cedeo", address:"58 Avenue de Grasse", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:59, name:"Cedeo Saint-Laurent-du-Var", chain:"Cedeo", address:"Allée des Peintres, ZI Secteur A1", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:60, name:"Cedeo Grasse", chain:"Cedeo", address:"ZI de Grasse", city:"Grasse", dept:"06", lat:43.6540, lng:6.9200, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:61, name:"Cedeo Beausoleil", chain:"Cedeo", address:"Avenue du Général de Gaulle", city:"Beausoleil", dept:"06", lat:43.7430, lng:7.4230, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:62, name:"Cedeo Le Cannet", chain:"Cedeo", address:"Boulevard Carnot", city:"Le Cannet", dept:"06", lat:43.5690, lng:7.0180, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  // ═══ CEDEO (83) ═══
  { id:63, name:"Cedeo Toulon", chain:"Cedeo", address:"ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1260, lng:6.0130, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:64, name:"Cedeo Fréjus", chain:"Cedeo", address:"ZA des Lions", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },
  { id:65, name:"Cedeo Brignoles", chain:"Cedeo", address:"1185 Boulevard Bernard Long, ZI des Consacs", city:"Brignoles", dept:"83", lat:43.4060, lng:6.0620, specialty:"Plomberie, chauffage", website:"https://www.cedeo.fr", hasPrices:false, color:"#00A3E0" },

  // ═══ BROSSETTE ═══
  { id:66, name:"Brossette Nice Centre", chain:"Brossette", address:"13bis Rue Paul Deroulede", city:"Nice", dept:"06", lat:43.7050, lng:7.2620, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },
  { id:67, name:"Brossette Nice Est", chain:"Brossette", address:"45 Rue Smolett", city:"Nice", dept:"06", lat:43.7150, lng:7.2850, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },
  { id:68, name:"Brossette Antibes", chain:"Brossette", address:"76 Avenue Philippe Rochat", city:"Antibes", dept:"06", lat:43.6090, lng:7.0730, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },
  { id:69, name:"Brossette Beausoleil", chain:"Brossette", address:"4 Rue Victor Hugo", city:"Beausoleil", dept:"06", lat:43.7430, lng:7.4230, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },
  { id:70, name:"Brossette Cagnes-sur-Mer", chain:"Brossette", address:"58 Avenue de Grasse", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },
  { id:71, name:"Brossette Toulon", chain:"Brossette", address:"Avenue du Général Brosset", city:"Toulon", dept:"83", lat:43.1270, lng:5.9310, specialty:"Plomberie, sanitaire", website:"https://www.brossette.fr", hasPrices:false, color:"#4169E1" },

  // ═══ TOLLENS ═══
  { id:72, name:"Tollens Nice Châteauneuf", chain:"Tollens", address:"32 Rue de Châteauneuf", city:"Nice", dept:"06", lat:43.7050, lng:7.2780, specialty:"Peinture pro", website:"https://www.tollens.com", hasPrices:true, color:"#8B4513" },
  { id:73, name:"Tollens Nice Turin", chain:"Tollens", address:"88 Route de Turin", city:"Nice", dept:"06", lat:43.7120, lng:7.2900, specialty:"Peinture pro", website:"https://www.tollens.com", hasPrices:true, color:"#8B4513" },
  { id:74, name:"Tollens Cannes", chain:"Tollens", address:"Zone d'activités La Bocca", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Peinture pro", website:"https://www.tollens.com", hasPrices:true, color:"#8B4513" },
  { id:75, name:"Tollens Toulon", chain:"Tollens", address:"357 Avenue Général Pruneau", city:"Toulon", dept:"83", lat:43.1300, lng:5.9400, specialty:"Peinture pro", website:"https://www.tollens.com", hasPrices:true, color:"#8B4513" },

  // ═══ ZOLPAN ═══
  { id:76, name:"Zolpan Cagnes-sur-Mer", chain:"Zolpan", address:"Avenue des Alpes, Sortie A6", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },
  { id:77, name:"Zolpan Le Cannet Rocheville", chain:"Zolpan", address:"45 Chemin de l'Olivet", city:"Le Cannet", dept:"06", lat:43.5710, lng:7.0210, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },
  { id:78, name:"Zolpan Grasse", chain:"Zolpan", address:"10 Chemin du Moulin de Brun", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },
  { id:79, name:"Zolpan Menton", chain:"Zolpan", address:"7 Avenue Thiers", city:"Menton", dept:"06", lat:43.7747, lng:7.4975, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },
  { id:80, name:"Zolpan Mandelieu-la-Napoule", chain:"Zolpan", address:"49 Allée Charles Nungesser", city:"Mandelieu-la-Napoule", dept:"06", lat:43.5480, lng:6.9350, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },
  { id:81, name:"Zolpan La Seyne-sur-Mer", chain:"Zolpan", address:"ZI La Seyne-sur-Mer", city:"La Seyne-sur-Mer", dept:"83", lat:43.0830, lng:5.8870, specialty:"Peinture", website:"https://www.zolpan.fr", hasPrices:true, color:"#B8860B" },

  // ═══ REXEL (06) ═══
  { id:82, name:"Rexel Nice", chain:"Rexel", address:"40 Boulevard Saint Roch", city:"Nice", dept:"06", lat:43.7070, lng:7.2620, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:83, name:"Rexel Nice Est", chain:"Rexel", address:"20-28 Boulevard de l'Armée des Alpes", city:"Nice", dept:"06", lat:43.7260, lng:7.2980, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:84, name:"Rexel Carros", chain:"Rexel", address:"ZAC de la Grave, Route de la Grave", city:"Carros", dept:"06", lat:43.7830, lng:7.1880, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:85, name:"Rexel Saint-Laurent-du-Var", chain:"Rexel", address:"Allée des Peintres, ZI Sect A", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:86, name:"Rexel Antibes", chain:"Rexel", address:"Route des Cistes, ZA des 3 Moulins", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:87, name:"Rexel Vallauris", chain:"Rexel", address:"2720 Chemin de Saint-Bernard", city:"Vallauris", dept:"06", lat:43.5790, lng:7.0540, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:88, name:"Rexel Grasse", chain:"Rexel", address:"129 Route de la Paoute", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:89, name:"Rexel Mandelieu", chain:"Rexel", address:"Avenue Jean Mermoz, Parc de la Siagne", city:"Mandelieu-la-Napoule", dept:"06", lat:43.5480, lng:6.9350, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:90, name:"Rexel Menton", chain:"Rexel", address:"201 Avenue de l'Ormea, ZI du Haut Carei", city:"Menton", dept:"06", lat:43.7747, lng:7.4975, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  // ═══ REXEL (83) ═══
  { id:91, name:"Rexel La Valette-du-Var", chain:"Rexel", address:"Route de Nice, Rond-Point de la Bigue", city:"La Valette-du-Var", dept:"83", lat:43.1376, lng:5.9831, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:92, name:"Rexel La Garde", chain:"Rexel", address:"253 Avenue Louis Joseph Lambot", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },
  { id:93, name:"Rexel Six-Fours", chain:"Rexel", address:"430 Boulevard de Lery", city:"Six-Fours-les-Plages", dept:"83", lat:43.1010, lng:5.8420, specialty:"Électricité pro", website:"https://www.rexel.fr", hasPrices:false, color:"#003DA5" },

  // ═══ SONEPAR ═══
  { id:94, name:"Sonepar Nice Centre", chain:"Sonepar", address:"7 Rue François Pellos", city:"Nice", dept:"06", lat:43.7020, lng:7.2600, specialty:"Électricité pro", website:"https://www.sonepar.fr", hasPrices:false, color:"#1a1a1a" },
  { id:95, name:"Sonepar Nice Est", chain:"Sonepar", address:"Boulevard de l'Ariane", city:"Nice", dept:"06", lat:43.7260, lng:7.2980, specialty:"Électricité pro", website:"https://www.sonepar.fr", hasPrices:false, color:"#1a1a1a" },
  { id:96, name:"Sonepar Nice Ouest", chain:"Sonepar", address:"52 Avenue Valéry Giscard d'Estaing", city:"Nice", dept:"06", lat:43.7102, lng:7.1928, specialty:"Électricité pro", website:"https://www.sonepar.fr", hasPrices:false, color:"#1a1a1a" },
  { id:97, name:"Sonepar La Garde", chain:"Sonepar", address:"Avenue de Draguignan", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Électricité pro", website:"https://www.sonepar.fr", hasPrices:false, color:"#1a1a1a" },
  { id:98, name:"Sonepar Six-Fours", chain:"Sonepar", address:"ZI Camp Laurent", city:"Six-Fours-les-Plages", dept:"83", lat:43.1010, lng:5.8420, specialty:"Électricité pro", website:"https://www.sonepar.fr", hasPrices:false, color:"#1a1a1a" },

  // ═══ YESSS ÉLECTRIQUE (06) ═══
  { id:99, name:"YESSS Nice", chain:"YESSS Électrique", address:"Boulevard de l'Ariane", city:"Nice", dept:"06", lat:43.7240, lng:7.2970, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:100, name:"YESSS Nice Centre", chain:"YESSS Électrique", address:"Centre-ville", city:"Nice", dept:"06", lat:43.7020, lng:7.2620, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:101, name:"YESSS Nice Est", chain:"YESSS Électrique", address:"Route de Turin", city:"Nice", dept:"06", lat:43.7120, lng:7.2900, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:102, name:"YESSS Antibes", chain:"YESSS Électrique", address:"ZA des Trois Moulins", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:103, name:"YESSS Grasse", chain:"YESSS Électrique", address:"Route de la Paoute", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:104, name:"YESSS Menton", chain:"YESSS Électrique", address:"Avenue de l'Ormea", city:"Menton", dept:"06", lat:43.7747, lng:7.4975, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:105, name:"YESSS Villeneuve-Loubet", chain:"YESSS Électrique", address:"ZI Villeneuve-Loubet", city:"Villeneuve-Loubet", dept:"06", lat:43.6420, lng:7.1230, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  // ═══ YESSS ÉLECTRIQUE (83) ═══
  { id:106, name:"YESSS Toulon Centre", chain:"YESSS Électrique", address:"538 Avenue Maréchal de Lattre de Tassigny", city:"Toulon", dept:"83", lat:43.1180, lng:5.9450, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:107, name:"YESSS La Valette-du-Var", chain:"YESSS Électrique", address:"Route de Nice", city:"La Valette-du-Var", dept:"83", lat:43.1376, lng:5.9831, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:108, name:"YESSS Six-Fours", chain:"YESSS Électrique", address:"ZI Camp Laurent", city:"Six-Fours-les-Plages", dept:"83", lat:43.1010, lng:5.8420, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },
  { id:109, name:"YESSS Saint-Raphaël", chain:"YESSS Électrique", address:"ZA Saint-Raphaël", city:"Saint-Raphaël", dept:"83", lat:43.4250, lng:6.7690, specialty:"Électricité", website:"https://www.yesss-fr.com", hasPrices:false, color:"#FFD700" },

  // ═══ TOUT FAIRE CÔTE D'AZUR ═══
  { id:110, name:"Tout Faire Mougins", chain:"Tout Faire", address:"609 Route de la Roquette", city:"Mougins", dept:"06", lat:43.6000, lng:6.9880, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:111, name:"Tout Faire Saint-Laurent-du-Var", chain:"Tout Faire", address:"ZI Saint-Laurent-du-Var", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:112, name:"Tout Faire Cagnes-sur-Mer", chain:"Tout Faire", address:"Avenue de Grasse", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:113, name:"Tout Faire Antibes", chain:"Tout Faire", address:"ZI Les Trois Moulins", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:114, name:"Tout Faire Cannes", chain:"Tout Faire", address:"La Bocca", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:115, name:"Tout Faire Saint-Martin-du-Var", chain:"Tout Faire", address:"Route de Nice", city:"Saint-Martin-du-Var", dept:"06", lat:43.8120, lng:7.1950, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:116, name:"Tout Faire Fréjus", chain:"Tout Faire", address:"ZA de Fréjus", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:117, name:"Tout Faire Fayence", chain:"Tout Faire", address:"Route de Draguignan", city:"Fayence", dept:"83", lat:43.6230, lng:6.6930, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },
  { id:118, name:"Tout Faire Callian", chain:"Tout Faire", address:"Route Départementale", city:"Callian", dept:"83", lat:43.6200, lng:6.7550, specialty:"Matériaux construction", website:"https://www.toutfairecotedazur.fr", hasPrices:false, color:"#555555" },

  // ═══ PROLIANS ═══
  { id:119, name:"Prolians Nice La Trinité", chain:"Prolians", address:"391 Avenue Joseph Louis Lambot", city:"La Trinité", dept:"06", lat:43.7450, lng:7.3140, specialty:"Fournitures industrielles", website:"https://magasin.prolians.fr", hasPrices:false, color:"#333333" },
  { id:120, name:"Prolians Cannes", chain:"Prolians", address:"La Bocca", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Fournitures industrielles", website:"https://magasin.prolians.fr", hasPrices:false, color:"#333333" },
  { id:121, name:"Prolians Toulon La Garde", chain:"Prolians", address:"334 Avenue Joseph Louis Lambot, ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Fournitures industrielles", website:"https://magasin.prolians.fr", hasPrices:false, color:"#333333" },
  { id:122, name:"Prolians Six-Fours", chain:"Prolians", address:"ZI Camp Laurent, Rue François Noël Babeuf", city:"La Seyne-sur-Mer", dept:"83", lat:43.0920, lng:5.8680, specialty:"Fournitures industrielles", website:"https://magasin.prolians.fr", hasPrices:false, color:"#333333" },
  { id:123, name:"Prolians Draguignan", chain:"Prolians", address:"ZI de Draguignan", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Fournitures industrielles", website:"https://magasin.prolians.fr", hasPrices:false, color:"#333333" },

  // ═══ KILOUTOU (06) ═══
  { id:124, name:"Kiloutou Nice", chain:"Kiloutou", address:"45 Boulevard de l'Ariane", city:"Nice", dept:"06", lat:43.7290, lng:7.3010, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:125, name:"Kiloutou Nice Saint-Augustin", chain:"Kiloutou", address:"58 Avenue Saint-Augustin", city:"Nice", dept:"06", lat:43.6850, lng:7.2050, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:126, name:"Kiloutou Antibes", chain:"Kiloutou", address:"348 Chemin des Terriers", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:127, name:"Kiloutou Cannes La Bocca", chain:"Kiloutou", address:"150 Avenue de la Roubine", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:128, name:"Kiloutou Saint-Laurent-du-Var", chain:"Kiloutou", address:"ZI Saint-Laurent-du-Var", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:129, name:"Kiloutou Grasse", chain:"Kiloutou", address:"43 Route de la Marigarde", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:130, name:"Kiloutou Castellar", chain:"Kiloutou", address:"716 Avenue de Saint-Roman", city:"Castellar", dept:"06", lat:43.7950, lng:7.5050, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  // ═══ KILOUTOU (83) ═══
  { id:131, name:"Kiloutou Toulon La Garde", chain:"Kiloutou", address:"ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:132, name:"Kiloutou La Seyne-sur-Mer", chain:"Kiloutou", address:"ZI La Seyne-sur-Mer", city:"La Seyne-sur-Mer", dept:"83", lat:43.0830, lng:5.8870, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:133, name:"Kiloutou Fréjus", chain:"Kiloutou", address:"ZA de Fréjus", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },
  { id:134, name:"Kiloutou Draguignan", chain:"Kiloutou", address:"ZI de Draguignan", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Location matériel", website:"https://www.kiloutou.fr", hasPrices:true, color:"#FF4444" },

  // ═══ LOXAM (06) ═══
  { id:135, name:"Loxam Nice Est", chain:"Loxam", address:"18 Chemin des Chênes Blancs", city:"Nice", dept:"06", lat:43.7260, lng:7.2980, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:136, name:"Loxam Nice Ouest", chain:"Loxam", address:"217 Boulevard du Mercantour", city:"Nice", dept:"06", lat:43.7102, lng:7.1928, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:137, name:"Loxam Access Nice", chain:"Loxam", address:"1155 Route de la Baronne", city:"Gattières", dept:"06", lat:43.7610, lng:7.1770, specialty:"Location nacelles", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:138, name:"Loxam Antibes", chain:"Loxam", address:"560 Allée des Terriers", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:139, name:"Loxam Cannes", chain:"Loxam", address:"147 Avenue Michel Jourdan", city:"Le Cannet", dept:"06", lat:43.5700, lng:7.0150, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  // ═══ LOXAM (83) ═══
  { id:140, name:"Loxam Toulon Centre", chain:"Loxam", address:"21 Chemin Tombouctou, Quartier Lagoubran", city:"Toulon", dept:"83", lat:43.1200, lng:5.9150, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:141, name:"Loxam La Farlède", chain:"Loxam", address:"Rue Alphonse Lavallée, ZI les Pioux", city:"La Farlède", dept:"83", lat:43.1700, lng:6.0500, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:142, name:"Loxam Fréjus", chain:"Loxam", address:"ZA de Fréjus", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },
  { id:143, name:"Loxam La Seyne-sur-Mer", chain:"Loxam", address:"ZI Camp Laurent", city:"La Seyne-sur-Mer", dept:"83", lat:43.0830, lng:5.8870, specialty:"Location matériel", website:"https://www.loxam.fr", hasPrices:true, color:"#0055A4" },

  // ═══ RICHARDSON ═══
  { id:144, name:"Richardson Nice", chain:"Richardson", address:"70-72 Route de Turin", city:"Nice", dept:"06", lat:43.7120, lng:7.2900, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },
  { id:145, name:"Richardson Nice Centre", chain:"Richardson", address:"14 Avenue Villermont", city:"Nice", dept:"06", lat:43.7050, lng:7.2780, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },
  { id:146, name:"Richardson Antibes", chain:"Richardson", address:"172 Avenue Weisweiller, ZI Les Terriers", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },
  { id:147, name:"Richardson Mougins", chain:"Richardson", address:"115 Chemin de Provence", city:"Mougins", dept:"06", lat:43.6000, lng:6.9880, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },
  { id:148, name:"Richardson Cagnes-sur-Mer", chain:"Richardson", address:"15 Chemin du Val Fleuri", city:"Cagnes-sur-Mer", dept:"06", lat:43.6643, lng:7.1490, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },
  { id:149, name:"Richardson Toulon", chain:"Richardson", address:"ZI Toulon Est", city:"Toulon", dept:"83", lat:43.1270, lng:5.9310, specialty:"Salle de bain, carrelage", website:"https://www.richardson.fr", hasPrices:false, color:"#808080" },

  // ═══ CIFFREO BONA ═══
  { id:150, name:"Ciffreo Bona Nice Pasteur", chain:"Ciffreo Bona", address:"5 Avenue Robert Malaval", city:"Nice", dept:"06", lat:43.7000, lng:7.2730, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:151, name:"Ciffreo Bona Nice Diderot", chain:"Ciffreo Bona", address:"2 Rue Diderot", city:"Nice", dept:"06", lat:43.7030, lng:7.2700, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:152, name:"Ciffreo Bona Saint-Laurent-du-Var", chain:"Ciffreo Bona", address:"ZI Saint-Laurent-du-Var", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:153, name:"Ciffreo Bona Antibes", chain:"Ciffreo Bona", address:"ZA des Trois Moulins", city:"Antibes", dept:"06", lat:43.6100, lng:7.0680, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:154, name:"Ciffreo Bona Cannes La Bocca", chain:"Ciffreo Bona", address:"207-209 Avenue Francis Tonner", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:155, name:"Ciffreo Bona Carros", chain:"Ciffreo Bona", address:"ZI de Carros", city:"Carros", dept:"06", lat:43.7830, lng:7.1880, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:156, name:"Ciffreo Bona Grasse", chain:"Ciffreo Bona", address:"Route de la Paoute", city:"Grasse", dept:"06", lat:43.6588, lng:6.9228, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:157, name:"Ciffreo Bona Vence", chain:"Ciffreo Bona", address:"Route de Grasse", city:"Vence", dept:"06", lat:43.7220, lng:7.1120, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:158, name:"Ciffreo Bona Menton", chain:"Ciffreo Bona", address:"Avenue de l'Ormea", city:"Menton", dept:"06", lat:43.7747, lng:7.4975, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:159, name:"Ciffreo Bona Fréjus", chain:"Ciffreo Bona", address:"ZAC de Pôle Production, Avenue des Lions", city:"Fréjus", dept:"83", lat:43.4332, lng:6.7370, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:160, name:"Ciffreo Bona La Garde", chain:"Ciffreo Bona", address:"ZI Toulon Est", city:"La Garde", dept:"83", lat:43.1244, lng:6.0149, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:161, name:"Ciffreo Bona La Farlède", chain:"Ciffreo Bona", address:"ZI Les Pioux", city:"La Farlède", dept:"83", lat:43.1700, lng:6.0500, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:162, name:"Ciffreo Bona Draguignan", chain:"Ciffreo Bona", address:"Avenue des Vignerons", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },
  { id:163, name:"Ciffreo Bona Sanary-sur-Mer", chain:"Ciffreo Bona", address:"ZI Sanary", city:"Sanary-sur-Mer", dept:"83", lat:43.1190, lng:5.8010, specialty:"Matériaux, carrelage", website:"https://www.ciffreobona.fr", hasPrices:false, color:"#990000" },

  // ═══ GEDIMAT ═══
  { id:164, name:"Gedimat Draguignan", chain:"Gedimat", address:"Route de Lorgues", city:"Draguignan", dept:"83", lat:43.5370, lng:6.4640, specialty:"Matériaux construction", website:"https://www.gedimat.fr", hasPrices:false, color:"#2E8B57" },
  { id:165, name:"Gedimat Les Arcs", chain:"Gedimat", address:"Route Nationale 7", city:"Les Arcs", dept:"83", lat:43.4620, lng:6.4740, specialty:"Matériaux construction", website:"https://www.gedimat.fr", hasPrices:false, color:"#2E8B57" },

  // ═══ BIGMAT ═══
  { id:166, name:"BigMat Cannes", chain:"BigMat", address:"ZI La Bocca", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Matériaux construction", website:"https://www.bigmat.fr", hasPrices:false, color:"#8B0000" },

  // ═══ LEGALLAIS ═══
  { id:167, name:"Legallais Nice", chain:"Legallais", address:"Allée des Peintres, ZI Secteur A1", city:"Saint-Laurent-du-Var", dept:"06", lat:43.6686, lng:7.1889, specialty:"Quincaillerie pro", website:"https://www.legallais.com", hasPrices:false, color:"#4682B4" },

  // ═══ SALICA ANCONETTI ═══
  { id:168, name:"Salica Anconetti Nice Cessole", chain:"Salica Anconetti", address:"7 Rue Henry de Cessole", city:"Nice", dept:"06", lat:43.7060, lng:7.2700, specialty:"Plomberie, matériaux", website:"https://www.salica.fr", hasPrices:false, color:"#D2691E" },
  { id:169, name:"Salica Anconetti Nice Gloria", chain:"Salica Anconetti", address:"6 Avenue Gloria", city:"Nice", dept:"06", lat:43.7020, lng:7.2550, specialty:"Plomberie, matériaux", website:"https://www.salica.fr", hasPrices:false, color:"#D2691E" },
  { id:170, name:"Salica Anconetti Cannes La Bocca", chain:"Salica Anconetti", address:"207-209 Avenue Francis Tonner", city:"Cannes", dept:"06", lat:43.5528, lng:6.9500, specialty:"Plomberie, matériaux", website:"https://www.salica.fr", hasPrices:false, color:"#D2691E" },
  { id:171, name:"Salica Anconetti Carros", chain:"Salica Anconetti", address:"ZI de Carros", city:"Carros", dept:"06", lat:43.7830, lng:7.1880, specialty:"Plomberie, matériaux", website:"https://www.salica.fr", hasPrices:false, color:"#D2691E" },

  // ═══ HYDRALIANS ═══
  { id:172, name:"Hydralians La Gaude", chain:"Hydralians", address:"Route de Saint-Jeannet", city:"La Gaude", dept:"06", lat:43.7290, lng:7.1580, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },
  { id:173, name:"Hydralians Villeneuve-Loubet", chain:"Hydralians", address:"ZI Villeneuve-Loubet", city:"Villeneuve-Loubet", dept:"06", lat:43.6420, lng:7.1230, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },
  { id:174, name:"Hydralians Mandelieu", chain:"Hydralians", address:"Avenue de la Napoule", city:"Mandelieu-la-Napoule", dept:"06", lat:43.5480, lng:6.9350, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },
  { id:175, name:"Hydralians Six-Fours", chain:"Hydralians", address:"ZI Camp Laurent", city:"Six-Fours-les-Plages", dept:"83", lat:43.1010, lng:5.8420, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },
  { id:176, name:"Hydralians La Crau", chain:"Hydralians", address:"ZI La Crau", city:"La Crau", dept:"83", lat:43.1490, lng:6.0730, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },
  { id:177, name:"Hydralians Puget-sur-Argens", chain:"Hydralians", address:"Route de Fréjus", city:"Puget-sur-Argens", dept:"83", lat:43.4550, lng:6.6870, specialty:"Piscine, pompage, paysage", website:"https://www.hydralians.fr", hasPrices:false, color:"#20B2AA" },

  // ═══ SIKKENS ═══
  { id:178, name:"Sikkens Nice Centre", chain:"Sikkens", address:"14 Avenue Villermont", city:"Nice", dept:"06", lat:43.7050, lng:7.2780, specialty:"Peinture pro", website:"https://www.sikkens-solutions.fr", hasPrices:false, color:"#DAA520" },
  { id:179, name:"Sikkens Nice Ouest", chain:"Sikkens", address:"742 Route de Grenoble", city:"Nice", dept:"06", lat:43.6900, lng:7.2100, specialty:"Peinture pro", website:"https://www.sikkens-solutions.fr", hasPrices:false, color:"#DAA520" },
  { id:180, name:"Sikkens Beausoleil", chain:"Sikkens", address:"31bis Avenue Paul Doumer", city:"Beausoleil", dept:"06", lat:43.7430, lng:7.4230, specialty:"Peinture pro", website:"https://www.sikkens-solutions.fr", hasPrices:false, color:"#DAA520" },

  // ═══ BRICORAMA (MANQUANTS) ═══
  { id:181, name:"Bricorama Nice", chain:"Bricorama", address:"10 Avenue de la Californie", city:"Nice", dept:"06", lat:43.691, lng:7.249, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },
  { id:182, name:"Bricorama Cagnes-sur-Mer", chain:"Bricorama", address:"102 Route de Grasse", city:"Cagnes-sur-Mer", dept:"06", lat:43.660, lng:7.142, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },
  { id:183, name:"Bricorama Vence", chain:"Bricorama", address:"800 Avenue Rhin et Danube", city:"Vence", dept:"06", lat:43.722, lng:7.107, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },
  { id:184, name:"Bricorama Fréjus", chain:"Bricorama", address:"745 Avenue du 15ème Corps", city:"Fréjus", dept:"83", lat:43.432, lng:6.735, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },
  { id:185, name:"Bricorama Roquebrune-sur-Argens", chain:"Bricorama", address:"CD 47, Quartier Barbussi", city:"Roquebrune-sur-Argens", dept:"83", lat:43.447, lng:6.636, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },
  { id:186, name:"Bricorama Vidauban", chain:"Bricorama", address:"1 Avenue du Maréchal Foch", city:"Vidauban", dept:"83", lat:43.425, lng:6.431, specialty:"Bricolage proximité", website:"https://www.bricorama.fr", hasPrices:true, color:"#FF6600" },

  // ═══ BALITRAND (NOUVEAU — chaîne régionale PACA) ═══
  { id:187, name:"Balitrand Nice Pasteur", chain:"Balitrand", address:"132 Boulevard Pasteur", city:"Nice", dept:"06", lat:43.705, lng:7.255, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:188, name:"Balitrand Nice Diderot", chain:"Balitrand", address:"2 Rue Diderot", city:"Nice", dept:"06", lat:43.706, lng:7.268, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:189, name:"Balitrand Nice Cais de Gilette", chain:"Balitrand", address:"2 Rue Cais de Gilette", city:"Nice", dept:"06", lat:43.717, lng:7.282, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:190, name:"Balitrand Antibes", chain:"Balitrand", address:"1599 Avenue Jules Grec", city:"Antibes", dept:"06", lat:43.591, lng:7.095, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:191, name:"Balitrand Cannes Centre", chain:"Balitrand", address:"20 Avenue des Anglais", city:"Cannes", dept:"06", lat:43.555, lng:6.950, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:192, name:"Balitrand Cannes La Bocca", chain:"Balitrand", address:"183 Avenue de la Roubine", city:"Cannes", dept:"06", lat:43.548, lng:6.938, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:193, name:"Balitrand La Colle-sur-Loup", chain:"Balitrand", address:"430 Boulevard Pierre Sauvaigo", city:"La Colle-sur-Loup", dept:"06", lat:43.688, lng:7.102, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:194, name:"Balitrand La Garde", chain:"Balitrand", address:"1286 Avenue de Draguignan, ZI Toulon Est", city:"La Garde", dept:"83", lat:43.138, lng:6.015, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:195, name:"Balitrand Fréjus", chain:"Balitrand", address:"2 Rue de la Galissardière", city:"Fréjus", dept:"83", lat:43.432, lng:6.735, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:196, name:"Balitrand Draguignan", chain:"Balitrand", address:"61 Boulevard Saint-Exupéry", city:"Draguignan", dept:"83", lat:43.536, lng:6.462, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },
  { id:197, name:"Balitrand Brignoles", chain:"Balitrand", address:"1428 Boulevard Bernard Long, ZI des Consacs", city:"Brignoles", dept:"83", lat:43.405, lng:6.062, specialty:"Plomberie, quincaillerie", website:"https://www.balitrand.fr", hasPrices:false, color:"#C71585" },

  // ═══ CHAUSSON MATÉRIAUX (NOUVEAU) ═══
  { id:198, name:"Chausson Nice", chain:"Chausson Matériaux", address:"78 Avenue Cyrille Besset", city:"Nice", dept:"06", lat:43.700, lng:7.244, specialty:"Matériaux construction", website:"https://www.chausson.fr", hasPrices:false, color:"#228B22" },
  { id:199, name:"Chausson Carros Bois", chain:"Chausson Matériaux", address:"1ère Avenue, ZI Carros", city:"Carros", dept:"06", lat:43.792, lng:7.188, specialty:"Bois, couverture", website:"https://www.chausson.fr", hasPrices:false, color:"#228B22" },
  { id:200, name:"Chausson Saint-Laurent-du-Var", chain:"Chausson Matériaux", address:"1349 Avenue Pierre et Marie Curie", city:"Saint-Laurent-du-Var", dept:"06", lat:43.672, lng:7.186, specialty:"Matériaux construction", website:"https://www.chausson.fr", hasPrices:false, color:"#228B22" },
  { id:201, name:"Chausson Fréjus", chain:"Chausson Matériaux", address:"795 Avenue des Lions, ZAC Pôle Production", city:"Fréjus", dept:"83", lat:43.432, lng:6.735, specialty:"Matériaux construction", website:"https://www.chausson.fr", hasPrices:false, color:"#228B22" },
  { id:202, name:"Chausson Roquebrune-sur-Argens", chain:"Chausson Matériaux", address:"18-28 Rue du Commerce, ZAC Bouverie", city:"Roquebrune-sur-Argens", dept:"83", lat:43.447, lng:6.636, specialty:"Matériaux construction", website:"https://www.chausson.fr", hasPrices:false, color:"#228B22" },

  // ═══ PLATEFORME DU BÂTIMENT (NOUVEAU) ═══
  { id:203, name:"PdB Nice Magnan", chain:"Plateforme du Bâtiment", address:"21 Boulevard de la Madeleine", city:"Nice", dept:"06", lat:43.695, lng:7.245, specialty:"Matériaux pro", website:"https://www.laplateforme.com", hasPrices:false, color:"#FF1493" },
  { id:204, name:"PdB Nice Ariane", chain:"Plateforme du Bâtiment", address:"45-49 Boulevard de l'Ariane", city:"Nice", dept:"06", lat:43.724, lng:7.296, specialty:"Matériaux pro", website:"https://www.laplateforme.com", hasPrices:false, color:"#FF1493" },
  { id:205, name:"PdB Cannes La Bocca", chain:"Plateforme du Bâtiment", address:"215 Avenue Francis Tonner", city:"Cannes", dept:"06", lat:43.551, lng:6.952, specialty:"Matériaux pro", website:"https://www.laplateforme.com", hasPrices:false, color:"#FF1493" },
  { id:206, name:"PdB La Garde", chain:"Plateforme du Bâtiment", address:"257 Avenue Joliot Curie", city:"La Garde", dept:"83", lat:43.138, lng:6.015, specialty:"Matériaux pro", website:"https://www.laplateforme.com", hasPrices:false, color:"#FF1493" },

  // ═══ DISPANO (NOUVEAU — bois spécialisé) ═══
  { id:207, name:"Dispano Carros", chain:"Dispano", address:"1ère Avenue, ZI Carros", city:"Carros", dept:"06", lat:43.792, lng:7.188, specialty:"Bois, panneaux, menuiserie", website:"https://www.dispano.fr", hasPrices:false, color:"#8B6914" },
  { id:208, name:"Dispano Le Cannet", chain:"Dispano", address:"Chemin du Colombier", city:"Le Cannet", dept:"06", lat:43.572, lng:6.954, specialty:"Bois, panneaux, menuiserie", website:"https://www.dispano.fr", hasPrices:false, color:"#8B6914" },
  { id:209, name:"Dispano Puget-sur-Argens", chain:"Dispano", address:"ZI des Barestes", city:"Puget-sur-Argens", dept:"83", lat:43.454, lng:6.690, specialty:"Bois, panneaux, menuiserie", website:"https://www.dispano.fr", hasPrices:false, color:"#8B6914" },
  { id:210, name:"Dispano La Garde", chain:"Dispano", address:"189 Avenue de Draguignan", city:"La Garde", dept:"83", lat:43.138, lng:6.015, specialty:"Bois, panneaux, menuiserie", website:"https://www.dispano.fr", hasPrices:false, color:"#8B6914" },

  // ═══ FRANS BONHOMME (NOUVEAU — tubes/assainissement) ═══
  { id:211, name:"Frans Bonhomme Castagniers", chain:"Frans Bonhomme", address:"1400 Route de Grenoble", city:"Castagniers", dept:"06", lat:43.781, lng:7.222, specialty:"Tubes, assainissement", website:"https://www.fransbonhomme.fr", hasPrices:false, color:"#006400" },
  { id:212, name:"Frans Bonhomme Cannes La Bocca", chain:"Frans Bonhomme", address:"130 Avenue de la Roubine", city:"Cannes", dept:"06", lat:43.548, lng:6.938, specialty:"Tubes, assainissement", website:"https://www.fransbonhomme.fr", hasPrices:false, color:"#006400" },
  { id:213, name:"Frans Bonhomme Fréjus", chain:"Frans Bonhomme", address:"795 Avenue des Lions, ZAC Pôle Production", city:"Fréjus", dept:"83", lat:43.432, lng:6.735, specialty:"Tubes, assainissement", website:"https://www.fransbonhomme.fr", hasPrices:false, color:"#006400" },
  { id:214, name:"Frans Bonhomme La Garde", chain:"Frans Bonhomme", address:"109 Avenue Joseph Louis Lambot", city:"La Garde", dept:"83", lat:43.138, lng:6.015, specialty:"Tubes, assainissement", website:"https://www.fransbonhomme.fr", hasPrices:false, color:"#006400" },

  // ═══ WELDOM (NOUVEAU) ═══
  { id:215, name:"Weldom Menton", chain:"Weldom", address:"115 Vallée des Castagnins", city:"Menton", dept:"06", lat:43.779, lng:7.504, specialty:"Bricolage, jardin", website:"https://www.weldom.fr", hasPrices:true, color:"#E87722" },
  { id:216, name:"Weldom Hyères", chain:"Weldom", address:"616 Chemin Villette", city:"Hyères", dept:"83", lat:43.120, lng:6.130, specialty:"Bricolage, jardin", website:"https://www.weldom.fr", hasPrices:true, color:"#E87722" },
  { id:217, name:"Weldom Rocbaron", chain:"Weldom", address:"ZAC du Fray Redon", city:"Rocbaron", dept:"83", lat:43.312, lng:6.083, specialty:"Bricolage, jardin", website:"https://www.weldom.fr", hasPrices:true, color:"#E87722" },

  // ═══ BRICONAUTES (NOUVEAU) ═══
  { id:218, name:"Briconautes Nice", chain:"Briconautes", address:"22-24 Boulevard Gorbella", city:"Nice", dept:"06", lat:43.710, lng:7.265, specialty:"Bricolage", website:"https://magasin.leclub-bricolage.fr", hasPrices:true, color:"#32CD32" },
  { id:219, name:"Briconautes Le Muy", chain:"Briconautes", address:"233 Avenue Jean Moulin", city:"Le Muy", dept:"83", lat:43.471, lng:6.567, specialty:"Bricolage", website:"https://magasin.leclub-bricolage.fr", hasPrices:true, color:"#32CD32" },
  { id:220, name:"Briconautes Salernes", chain:"Briconautes", address:"9 Boulevard de la Libération", city:"Salernes", dept:"83", lat:43.561, lng:6.232, specialty:"Bricolage", website:"https://magasin.leclub-bricolage.fr", hasPrices:true, color:"#32CD32" },

  // ═══ LAPEYRE (NOUVEAU) ═══
  { id:221, name:"Lapeyre Nice", chain:"Lapeyre", address:"23 Boulevard de l'Ariane", city:"Nice", dept:"06", lat:43.724, lng:7.296, specialty:"Menuiserie, cuisine, SDB", website:"https://www.lapeyre.fr", hasPrices:true, color:"#B22222" },
  { id:222, name:"Lapeyre Villeneuve-Loubet", chain:"Lapeyre", address:"1162 Route Départementale 6007", city:"Villeneuve-Loubet", dept:"06", lat:43.638, lng:7.118, specialty:"Menuiserie, cuisine, SDB", website:"https://www.lapeyre.fr", hasPrices:true, color:"#B22222" },
  { id:223, name:"Lapeyre La Farlède", chain:"Lapeyre", address:"Route Nationale 97", city:"La Farlède", dept:"83", lat:43.163, lng:6.043, specialty:"Menuiserie, cuisine, SDB", website:"https://www.lapeyre.fr", hasPrices:true, color:"#B22222" },

  // ═══ AFDB (NOUVEAU — quincaillerie pro) ═══
  { id:224, name:"AFDB Nice", chain:"AFDB", address:"55 Boulevard Pierre Sola", city:"Nice", dept:"06", lat:43.718, lng:7.283, specialty:"Quincaillerie, serrurerie", website:"https://www.auforumdubatiment.fr", hasPrices:false, color:"#2F4F4F" },
  { id:225, name:"AFDB Saint-Laurent-du-Var", chain:"AFDB", address:"9 Allée des Peintres, ZI Secteur A", city:"Saint-Laurent-du-Var", dept:"06", lat:43.672, lng:7.186, specialty:"Quincaillerie, serrurerie", website:"https://www.auforumdubatiment.fr", hasPrices:false, color:"#2F4F4F" },

  // ═══ PUM PLASTIQUES (tubes/canalisations) ═══
  { id:226, name:"PUM Nice Ouest", chain:"PUM Plastiques", address:"Route de la Baronne", city:"Saint-Jeannet", dept:"06", lat:43.748, lng:7.154, specialty:"Tubes plastiques, canalisations", website:"https://www.pum.fr", hasPrices:false, color:"#4B0082" },
  { id:227, name:"PUM Nice Est", chain:"PUM Plastiques", address:"Bd de l'Oli", city:"La Trinité", dept:"06", lat:43.745, lng:7.314, specialty:"Tubes plastiques, canalisations", website:"https://www.pum.fr", hasPrices:false, color:"#4B0082" },
  { id:228, name:"PUM La Garde", chain:"PUM Plastiques", address:"136 Avenue Robert Schumann, ZI Les Plantades", city:"La Garde", dept:"83", lat:43.124, lng:6.015, specialty:"Tubes plastiques, canalisations", website:"https://www.pum.fr", hasPrices:false, color:"#4B0082" },
  { id:229, name:"PUM Six-Fours", chain:"PUM Plastiques", address:"119 Rue de l'Industrie, ZAC des Playes", city:"Six-Fours-les-Plages", dept:"83", lat:43.101, lng:5.842, specialty:"Tubes plastiques, canalisations", website:"https://www.pum.fr", hasPrices:false, color:"#4B0082" },

  // ═══ ASTURIENNE (couverture/toiture) ═══
  { id:230, name:"Asturienne Cagnes-sur-Mer", chain:"Asturienne", address:"73 Chemin du Vallon des Vaux", city:"Cagnes-sur-Mer", dept:"06", lat:43.664, lng:7.149, specialty:"Toiture, couverture, zinguerie", website:"https://www.asturienne.fr", hasPrices:false, color:"#B8860B" },
  { id:231, name:"Asturienne Le Muy", chain:"Asturienne", address:"ZAC des Ferrières, Avenue de l'Europe", city:"Le Muy", dept:"83", lat:43.471, lng:6.567, specialty:"Toiture, couverture, zinguerie", website:"https://www.asturienne.fr", hasPrices:false, color:"#B8860B" },

  // ═══ TRENOIS DECAMPS (quincaillerie pro) ═══
  { id:232, name:"Trenois Decamps Mougins", chain:"Trenois Decamps", address:"1555 Chemin de la Plaine", city:"Mougins", dept:"06", lat:43.600, lng:6.988, specialty:"Quincaillerie pro, outillage, EPI", website:"https://www.trenois.com", hasPrices:false, color:"#556B2F" },
  { id:233, name:"Trenois Decamps La Garde", chain:"Trenois Decamps", address:"105 Avenue Joseph-Louis Lambot", city:"La Garde", dept:"83", lat:43.124, lng:6.015, specialty:"Quincaillerie pro, outillage, EPI", website:"https://www.trenois.com", hasPrices:false, color:"#556B2F" },
  { id:234, name:"Trenois Decamps Grimaud", chain:"Trenois Decamps", address:"67 Chemin des Caucadis", city:"Grimaud", dept:"83", lat:43.274, lng:6.521, specialty:"Quincaillerie pro, outillage, EPI", website:"https://www.trenois.com", hasPrices:false, color:"#556B2F" },

  // ═══ BRICOMAN (matériaux pro) ═══
  { id:235, name:"Bricoman La Farlède", chain:"Bricoman", address:"331 Rue du Dr Schweitzer, ZI Toulon Est", city:"La Farlède", dept:"83", lat:43.170, lng:6.050, specialty:"Matériaux construction pro", website:"https://www.bricoman.fr", hasPrices:true, color:"#1E90FF" },
  { id:236, name:"Bricoman Fréjus", chain:"Bricoman", address:"ZI Secteur Sud, Lotissement du Capitou", city:"Fréjus", dept:"83", lat:43.433, lng:6.737, specialty:"Matériaux construction pro", website:"https://www.bricoman.fr", hasPrices:true, color:"#1E90FF" },

  // ═══ SIMC (matériaux régional, Var uniquement) ═══
  { id:237, name:"SIMC La Garde", chain:"SIMC", address:"Avenue de Draguignan, Quartier Pauline", city:"La Garde", dept:"83", lat:43.124, lng:6.015, specialty:"Bois, matériaux construction", website:"https://www.simc.fr", hasPrices:false, color:"#8B7355" },
  { id:238, name:"SIMC Draguignan", chain:"SIMC", address:"975 Boulevard Saint-Exupéry", city:"Draguignan", dept:"83", lat:43.537, lng:6.464, specialty:"Bois, matériaux construction", website:"https://www.simc.fr", hasPrices:false, color:"#8B7355" },
  { id:239, name:"SIMC Hyères", chain:"SIMC", address:"Hyères", city:"Hyères", dept:"83", lat:43.120, lng:6.130, specialty:"TP, adduction d'eau", website:"https://www.simc.fr", hasPrices:false, color:"#8B7355" },
  { id:240, name:"SIMC Solliès-Pont", chain:"SIMC", address:"Les Plantades", city:"Solliès-Pont", dept:"83", lat:43.191, lng:6.042, specialty:"Matériaux construction", website:"https://www.simc.fr", hasPrices:false, color:"#8B7355" },
  { id:241, name:"SIMC Sanary-sur-Mer", chain:"SIMC", address:"466 Chemin Raoul Coletta", city:"Sanary-sur-Mer", dept:"83", lat:43.119, lng:5.801, specialty:"Matériaux construction", website:"https://www.simc.fr", hasPrices:false, color:"#8B7355" },

  // ═══ ECOBATI (matériaux écologiques) ═══
  { id:242, name:"Ecobati Contes", chain:"Ecobati", address:"524 Route Départementale 15", city:"Contes", dept:"06", lat:43.810, lng:7.315, specialty:"Matériaux écologiques, isolants bio", website:"https://www.ecobati.com", hasPrices:true, color:"#3CB371" },

  // ═══ FERAUD CÔTE D'AZUR (quincaillerie régionale) ═══
  { id:243, name:"Feraud Côte d'Azur Nice", chain:"Feraud", address:"90 Rue Barbéris", city:"Nice", dept:"06", lat:43.705, lng:7.275, specialty:"Quincaillerie bâtiment, serrurerie", website:"", hasPrices:false, color:"#696969" },

  // ═══ FRANCE MATÉRIAUX (indépendants) ═══
  { id:244, name:"Quintane Matériaux Grasse", chain:"France Matériaux", address:"Route de Valbonne, Plascassier", city:"Grasse", dept:"06", lat:43.658, lng:6.923, specialty:"Gros oeuvre, isolation, carrelage", website:"https://negoce.france-materiaux.fr", hasPrices:false, color:"#A0522D" },

  // ═══ ITALIE — FRONTIÈRE ═══
  // VENTIMIGLIA
  { id:245, name:"Trucchi Efisio", chain:"Trucchi Efisio", address:"Via Carabiniere Antonio Fois 4/R, Bevera", city:"Ventimiglia (IT)", dept:"06" as const, lat:43.7878, lng:7.6097, specialty:"Matériaux, carrelage, SDB, peinture", website:"https://trucchiefisio.it", hasPrices:false, color:"#DC143C" },
  { id:246, name:"Centro Legno Ventimiglia", chain:"Centro Legno", address:"Corso Genova 47/A", city:"Ventimiglia (IT)", dept:"06" as const, lat:43.7870, lng:7.6050, specialty:"Bois, portes, fenêtres, parquet", website:"https://www.centrolegnoventimiglia.it", hasPrices:false, color:"#CD853F" },
  { id:247, name:"Sodifer Ferramenta", chain:"Sodifer", address:"Via Roma 17/D", city:"Ventimiglia (IT)", dept:"06" as const, lat:43.7908, lng:7.6136, specialty:"Quincaillerie, serrurerie", website:"", hasPrices:false, color:"#778899" },
  // VALLECROSIA
  { id:248, name:"C.M.E. Tasselli", chain:"CME Tasselli", address:"Via Roma 68", city:"Vallecrosia (IT)", dept:"06" as const, lat:43.7833, lng:7.6450, specialty:"Matériaux, ciment, isolation, plomberie", website:"https://www.cmetasselli.com", hasPrices:false, color:"#B22222" },
  // CAMPOROSSO
  { id:249, name:"Brico io Camporosso", chain:"Brico io", address:"Via Turistica 3", city:"Camporosso (IT)", dept:"06" as const, lat:43.7961, lng:7.6292, specialty:"Bricolage généraliste", website:"https://www.bricoio.it", hasPrices:true, color:"#FF8C00" },
  // SANREMO
  { id:250, name:"Asplanato Materiali Edili", chain:"Asplanato", address:"Via Pietro Agosti 145", city:"Sanremo (IT)", dept:"06" as const, lat:43.8160, lng:7.7680, specialty:"Matériaux construction, outillage", website:"https://www.asplanatomaterialiedili.it", hasPrices:false, color:"#CD5C5C" },
  { id:251, name:"Ferramenta Franco", chain:"Ferramenta Franco", address:"Via Martiri della Libertà 33", city:"Sanremo (IT)", dept:"06" as const, lat:43.8148, lng:7.7750, specialty:"Outillage, serrurerie, peinture", website:"https://www.ferramentafranco.com", hasPrices:false, color:"#778899" },
  // ARMA DI TAGGIA
  { id:252, name:"Bricofer Arma di Taggia", chain:"Bricofer", address:"Via del Piano, Regione Doneghe", city:"Arma di Taggia (IT)", dept:"06" as const, lat:43.8460, lng:7.8540, specialty:"Bricolage généraliste", website:"https://www.bricofer.it", hasPrices:true, color:"#FF4500" },
  // IMPERIA
  { id:253, name:"Brico io Imperia", chain:"Brico io", address:"Centro Sasa, Via Nazionale 373", city:"Imperia (IT)", dept:"06" as const, lat:43.8750, lng:8.0130, specialty:"Bricolage généraliste", website:"https://www.bricoio.it", hasPrices:true, color:"#FF8C00" },
  { id:254, name:"Bricofer Imperia", chain:"Bricofer", address:"Via G. Airenti 7", city:"Imperia (IT)", dept:"06" as const, lat:43.8870, lng:8.0340, specialty:"Bricolage généraliste", website:"https://www.bricofer.it", hasPrices:true, color:"#FF4500" },
  { id:255, name:"Centro Edile Imperiese", chain:"Centro Edile", address:"Via Dolcedo 9", city:"Imperia (IT)", dept:"06" as const, lat:43.8860, lng:8.0260, specialty:"Matériaux, carrelage, SDB", website:"https://www.centroedileimperiese.it", hasPrices:false, color:"#8B4513" },
  // PIEVE DI TECO
  { id:256, name:"Edilpieve", chain:"Edilpieve", address:"Via Provinciale per Albenga", city:"Pieve di Teco (IT)", dept:"06" as const, lat:44.0470, lng:7.9140, specialty:"Matériaux lourds, couverture", website:"http://www.materialiediliedilpieve.it", hasPrices:false, color:"#8B4513" },
];

const CHAINS = [...new Set(STORES.map((s) => s.chain))].sort();

// ─── PAGE ────────────────────────────────────────────────
export function MagasinsClient() {
  const [search, setSearch] = useState("");
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedDept, setSelectedDept] = useState("all");
  const [pricesOnly, setPricesOnly] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    return STORES.filter((s) => {
      if (search) {
        const q = search.toLowerCase();
        if (![s.name, s.chain, s.city, s.specialty].some((f) => f.toLowerCase().includes(q))) return false;
      }
      if (selectedChains.length && !selectedChains.includes(s.chain)) return false;
      if (selectedDept !== "all" && s.dept !== selectedDept) return false;
      if (pricesOnly && !s.hasPrices) return false;
      return true;
    });
  }, [search, selectedChains, selectedDept, pricesOnly]);

  const toggleChain = (chain: string) =>
    setSelectedChains((p) => (p.includes(chain) ? p.filter((c) => c !== chain) : [...p, chain]));

  const chainCounts = useMemo(() => {
    const c: Record<string, number> = {};
    STORES.forEach((s) => (c[s.chain] = (c[s.chain] || 0) + 1));
    return c;
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top bar */}
      <header className="bg-navy h-14 flex items-center px-4 gap-4 flex-shrink-0 z-50">
        <a href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <span className="font-[var(--font-display)] text-white text-base font-bold">
            Bati<span className="text-orange">Prix</span>
          </span>
        </a>
        <div className="h-6 w-px bg-white/10" />
        <span className="text-white/80 text-sm font-medium">Carte des magasins</span>
        <div className="flex-1" />
        <span className="text-steel text-sm">{filtered.length} magasins</span>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[380px] flex-shrink-0 border-r border-gray-200 flex flex-col bg-white">
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="p-3 border-b border-gray-100 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {CHAINS.map((chain) => {
                const store = STORES.find((s) => s.chain === chain)!;
                const active = selectedChains.includes(chain);
                return (
                  <button
                    key={chain}
                    onClick={() => toggleChain(chain)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium border transition-all ${
                      active
                        ? "text-white border-transparent"
                        : "text-gray-600 border-gray-200 hover:border-gray-400 bg-white"
                    }`}
                    style={active ? { backgroundColor: store.color, borderColor: store.color } : {}}
                  >
                    {!active && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: store.color }} />
                    )}
                    {chain}
                    <span className="opacity-60">{chainCounts[chain]}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-xs">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-gray-700 outline-none"
              >
                <option value="all">06 + 83</option>
                <option value="06">06 Alpes-Maritimes</option>
                <option value="83">83 Var</option>
              </select>
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={pricesOnly}
                  onChange={(e) => setPricesOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Prix en ligne
              </label>
            </div>
          </div>

          {/* Store list */}
          <div ref={listRef} className="flex-1 overflow-y-auto">
            {filtered.map((store) => (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedStore?.id === store.id ? "bg-orange/5 border-l-[3px] border-l-orange" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: store.color }} />
                    <span className="font-semibold text-sm text-gray-900">{store.name}</span>
                  </div>
                  {store.hasPrices && (
                    <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">
                      Prix
                    </span>
                  )}
                </div>
                <div className="ml-[18px] mt-0.5">
                  <p className="text-xs text-gray-500">{store.address}, {store.city}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{store.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          {mounted && (
            <>
              <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              />
              <MapContainer
                center={[43.5, 6.8]}
                zoom={9}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {filtered.map((store) => (
                  <StoreMarker
                    key={store.id}
                    store={store}
                    isSelected={selectedStore?.id === store.id}
                    onClick={() => setSelectedStore(store)}
                  />
                ))}
              </MapContainer>
            </>
          )}

          {/* Selected store popup overlay */}
          {selectedStore && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-[360px]">
              <button
                onClick={() => setSelectedStore(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-lg leading-none"
              >
                &times;
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedStore.color }} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {selectedStore.chain}
                </span>
                {selectedStore.hasPrices && (
                  <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium ml-auto">
                    Prix en ligne
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900">{selectedStore.name}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{selectedStore.address}, {selectedStore.city} ({selectedStore.dept})</p>
              <p className="text-xs text-gray-400 mt-0.5">{selectedStore.specialty}</p>
              <a
                href={selectedStore.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-orange font-medium hover:underline"
              >
                Voir le site &rarr;
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MARKER COMPONENT ────────────────────────────────────
function StoreMarker({
  store,
  isSelected,
  onClick,
}: {
  store: Store;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    import("leaflet").then(setL);
  }, []);

  if (!L) return null;

  const icon = L.divIcon({
    className: "",
    html: `<div style="
      width:${isSelected ? 18 : 12}px;
      height:${isSelected ? 18 : 12}px;
      background:${store.color};
      border:2px solid white;
      border-radius:50%;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ${isSelected ? "transform:scale(1.3);z-index:999;" : ""}
    "></div>`,
    iconSize: [isSelected ? 18 : 12, isSelected ? 18 : 12],
    iconAnchor: [isSelected ? 9 : 6, isSelected ? 9 : 6],
  });

  return (
    <Marker
      position={[store.lat, store.lng]}
      icon={icon}
      eventHandlers={{ click: onClick }}
    >
      <Popup>
        <div className="text-sm">
          <strong>{store.name}</strong>
          <br />
          {store.address}, {store.city}
        </div>
      </Popup>
    </Marker>
  );
}
