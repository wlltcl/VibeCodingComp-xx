"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface SkillNode {
  id: string
  name: string
  description: string
  x: number
  y: number
  unlocked: boolean
  completed: boolean
  prerequisites: string[]
  category: string
  icon: string
}

export function SkillMap() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const skillNodes: SkillNode[] = [
    // Center node
    {
      id: "start",
      name: "Learning Journey",
      description: "Begin your adventure",
      x: 400,
      y: 300,
      unlocked: true,
      completed: true,
      prerequisites: [],
      category: "core",
      icon: "🎯",
    },

    // Programming branch
    {
      id: "html",
      name: "HTML Basics",
      description: "Learn the structure of web pages",
      x: 300,
      y: 200,
      unlocked: true,
      completed: true,
      prerequisites: ["start"],
      category: "web",
      icon: "🌐",
    },
    {
      id: "css",
      name: "CSS Styling",
      description: "Make your pages beautiful",
      x: 200,
      y: 150,
      unlocked: true,
      completed: false,
      prerequisites: ["html"],
      category: "web",
      icon: "🎨",
    },
    {
      id: "js",
      name: "JavaScript",
      description: "Add interactivity to your sites",
      x: 400,
      y: 100,
      unlocked: true,
      completed: false,
      prerequisites: ["html"],
      category: "web",
      icon: "⚡",
    },
    {
      id: "react",
      name: "React",
      description: "Build modern web applications",
      x: 500,
      y: 50,
      unlocked: false,
      completed: false,
      prerequisites: ["js"],
      category: "web",
      icon: "⚛️",
    },

    // Data Science branch
    {
      id: "python",
      name: "Python Basics",
      description: "Learn programming fundamentals",
      x: 500,
      y: 200,
      unlocked: true,
      completed: false,
      prerequisites: ["start"],
      category: "data",
      icon: "🐍",
    },
    {
      id: "pandas",
      name: "Data Analysis",
      description: "Work with data using Pandas",
      x: 600,
      y: 150,
      unlocked: false,
      completed: false,
      prerequisites: ["python"],
      category: "data",
      icon: "📊",
    },
    {
      id: "ml",
      name: "Machine Learning",
      description: "Build intelligent systems",
      x: 700,
      y: 100,
      unlocked: false,
      completed: false,
      prerequisites: ["pandas"],
      category: "data",
      icon: "🤖",
    },

    // Design branch
    {
      id: "design",
      name: "Design Principles",
      description: "Learn visual design basics",
      x: 300,
      y: 400,
      unlocked: true,
      completed: false,
      prerequisites: ["start"],
      category: "design",
      icon: "🎭",
    },
    {
      id: "ux",
      name: "User Experience",
      description: "Create user-friendly interfaces",
      x: 200,
      y: 450,
      unlocked: false,
      completed: false,
      prerequisites: ["design"],
      category: "design",
      icon: "👤",
    },
    {
      id: "figma",
      name: "Figma Mastery",
      description: "Design with professional tools",
      x: 100,
      y: 400,
      unlocked: false,
      completed: false,
      prerequisites: ["ux"],
      category: "design",
      icon: "🔧",
    },
  ]

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setScale((prev) => Math.max(0.3, Math.min(3, prev + delta)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".skill-node") || (e.target as HTMLElement).closest("button")) {
      return
    }

    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (selectedSkill && !(e.target as HTMLElement).closest(".skill-node")) {
      setSelectedSkill(null)
    }
  }

  const resetView = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "core":
        return "bg-primary border-primary"
      case "web":
        return "bg-blue-600 border-blue-500"
      case "data":
        return "bg-purple-600 border-purple-500"
      case "design":
        return "bg-pink-600 border-pink-500"
      default:
        return "bg-gray-600 border-gray-500"
    }
  }

  return (
    <div className="h-full flex">
      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden bg-card rounded-lg border border-border">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setScale((prev) => Math.min(3, prev + 0.2))}
            className="bg-card border-border"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setScale((prev) => Math.max(0.3, prev - 0.2))}
            className="bg-card border-border"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={resetView} className="bg-card border-border">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Skill Map */}
        <div
          ref={mapRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {skillNodes.map((node) =>
                node.prerequisites.map((prereqId) => {
                  const prereq = skillNodes.find((n) => n.id === prereqId)
                  if (!prereq) return null

                  return (
                    <line
                      key={`${prereqId}-${node.id}`}
                      x1={prereq.x + 30}
                      y1={prereq.y + 30}
                      x2={node.x + 30}
                      y2={node.y + 30}
                      stroke={node.unlocked ? "var(--color-primary)" : "var(--color-muted)"}
                      strokeWidth="2"
                      strokeDasharray={node.unlocked ? "0" : "5,5"}
                    />
                  )
                }),
              )}
            </svg>

            {/* Skill Nodes */}
            {skillNodes.map((node) => (
              <div
                key={node.id}
                className={`skill-node absolute w-16 h-16 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
                  node.completed
                    ? `${getCategoryColor(node.category)} glow-effect`
                    : node.unlocked
                      ? `${getCategoryColor(node.category)} opacity-80`
                      : "bg-muted border-muted-foreground opacity-40"
                }`}
                style={{
                  left: node.x,
                  top: node.y,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSkill(node)
                }}
              >
                <span className="text-2xl">{node.icon}</span>
                {node.completed && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Preview Panel */}
      {selectedSkill && (
        <div className="w-80 ml-4">
          <Card className="p-6 bg-card border-border h-fit">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${getCategoryColor(selectedSkill.category)} flex items-center justify-center`}
                >
                  <span className="text-2xl">{selectedSkill.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedSkill.name}</h3>
                  <Badge variant="outline" className="mt-1">
                    {selectedSkill.category}
                  </Badge>
                </div>
              </div>

              <p className="text-muted-foreground">{selectedSkill.description}</p>

              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Status:</h4>
                <div className="flex gap-2">
                  {selectedSkill.completed && <Badge className="bg-green-600 text-white">Completed</Badge>}
                  {selectedSkill.unlocked && !selectedSkill.completed && (
                    <Badge className="bg-blue-600 text-white">Available</Badge>
                  )}
                  {!selectedSkill.unlocked && (
                    <Badge variant="outline" className="border-muted-foreground text-muted-foreground">
                      Locked
                    </Badge>
                  )}
                </div>
              </div>

              {selectedSkill.prerequisites.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Prerequisites:</h4>
                  <div className="space-y-1">
                    {selectedSkill.prerequisites.map((prereqId) => {
                      const prereq = skillNodes.find((n) => n.id === prereqId)
                      return prereq ? (
                        <div key={prereqId} className="text-sm text-muted-foreground">
                          • {prereq.name}
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              )}

              <Button className="w-full" disabled={!selectedSkill.unlocked || selectedSkill.completed}>
                {selectedSkill.completed ? "Completed" : selectedSkill.unlocked ? "Learn" : "Locked"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
