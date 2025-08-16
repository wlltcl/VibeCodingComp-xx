"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillMap } from "@/components/skill-map"
import { LessonsList } from "@/components/lessons-list"

export function MainContent() {
  const [activeTab, setActiveTab] = useState("map")

  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-card border-border">
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Map
          </TabsTrigger>
          <TabsTrigger
            value="lessons"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="flex-1 mt-4">
          <SkillMap />
        </TabsContent>

        <TabsContent value="lessons" className="flex-1 mt-4">
          <LessonsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
