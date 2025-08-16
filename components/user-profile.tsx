"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, BookOpen, Target } from "lucide-react"

interface UserStats {
  level: number
  experience: number
  maxExperience: number
  materialsStudied: number
  coursesCompleted: number
  coursesInProgress: number
  achievements: Achievement[]
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
}

export function UserProfile() {
  const [userStats] = useState<UserStats>({
    level: 12,
    experience: 2450,
    maxExperience: 3000,
    materialsStudied: 47,
    coursesCompleted: 8,
    coursesInProgress: 3,
    achievements: [
      {
        id: "1",
        name: "First Steps",
        description: "Complete your first lesson",
        icon: "🎯",
        unlocked: true,
        rarity: "common",
      },
      {
        id: "2",
        name: "Knowledge Seeker",
        description: "Study 10 materials",
        icon: "📚",
        unlocked: true,
        rarity: "common",
      },
      { id: "3", name: "Dedicated Learner", description: "Reach level 10", icon: "⭐", unlocked: true, rarity: "rare" },
      {
        id: "4",
        name: "Master Scholar",
        description: "Complete 5 courses",
        icon: "🏆",
        unlocked: true,
        rarity: "epic",
      },
      {
        id: "5",
        name: "Legendary Wisdom",
        description: "Reach level 25",
        icon: "👑",
        unlocked: false,
        rarity: "legendary",
      },
    ],
  })

  const experiencePercentage = (userStats.experience / userStats.maxExperience) * 100

  const getLevelColor = (level: number) => {
    if (level < 5) return "text-gray-400"
    if (level < 10) return "text-green-400"
    if (level < 15) return "text-blue-400"
    if (level < 20) return "text-purple-400"
    return "text-yellow-400"
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-600"
      case "rare":
        return "bg-blue-600"
      case "epic":
        return "bg-purple-600"
      case "legendary":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      {/* User Avatar and Level */}
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-primary glow-effect">
              <AvatarImage src="/fantasy-wizard-avatar.png" alt="User Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">W</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {userStats.level}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-foreground">Wizard Learner</h2>
            <p className={`text-lg font-semibold ${getLevelColor(userStats.level)}`}>Level {userStats.level}</p>
          </div>
        </div>
      </Card>

      {/* Experience Progress */}
      <Card className="p-4 bg-card border-border">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Experience</span>
            <span className="text-sm font-bold text-foreground">
              {userStats.experience} / {userStats.maxExperience}
            </span>
          </div>
          <Progress value={experiencePercentage} className="h-3 bg-muted" />
          <div className="text-xs text-center text-muted-foreground">
            {userStats.maxExperience - userStats.experience} XP to next level
          </div>
        </div>
      </Card>

      {/* Materials Studied Stats */}
      <Card className="p-4 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Materials Studied
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Materials</span>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {userStats.materialsStudied}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Courses Completed</span>
            <Badge variant="outline" className="border-primary text-primary">
              {userStats.coursesCompleted}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">In Progress</span>
            <Badge variant="outline" className="border-accent text-accent">
              {userStats.coursesInProgress}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-4 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Achievements
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {userStats.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-2 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? `${getRarityColor(achievement.rarity)} border-transparent glow-effect`
                  : "bg-muted border-border opacity-50"
              }`}
              title={`${achievement.name}: ${achievement.description}`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium text-white truncate">{achievement.name}</div>
              </div>
              {!achievement.unlocked && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
