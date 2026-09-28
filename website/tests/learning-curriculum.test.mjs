import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { learningSeries, getLearningLessonsForSeries } from '../src/data/learning.ts';

const expected = [
  ['SEO for Business', [2, 2, 2]],
  ['AI Search & Business Discovery', [1, 2, 1]],
  ['Web Conversion for Business Growth', [2, 2, 1]],
  ['Web Architecture for Business Continuity', [2, 2, 1]],
  ['Controlling Digital Project Costs', [1, 2, 1]],
  ['Building Brand Trust on Social Media', [2, 2, 1]],
  ['Building Brand Value Through Design', [1, 2, 1]],
];
const page = route => readFileSync(new URL(`../dist/${route}/index.html`, import.meta.url), 'utf8');

test('approved curriculum retains seven distinct courses, 21 chapters and 33 bilingual lessons', () => {
  assert.equal(learningSeries.length, expected.length);
  const ids = [];
  learningSeries.forEach((course, index) => {
    assert.equal(course.title.en, expected[index][0]);
    assert.deepEqual(course.chapters.map(chapter => chapter.lessons.length), expected[index][1]);
    assert.deepEqual(course.chapters.map(chapter => chapter.stage), ['understand', 'apply', 'decide']);
    const lessons = getLearningLessonsForSeries(course.id);
    assert.deepEqual(lessons.map(lesson => lesson.id), course.lessonIds);
    assert.deepEqual(lessons.map(lesson => lesson.order), lessons.map((_, i) => i + 1));
    for (const locale of ['en', 'id']) {
      for (const field of ['title', 'description', 'audience']) assert.ok(course[field][locale].trim());
      course.chapters.forEach(chapter => assert.ok(chapter.title[locale].trim()));
      lessons.forEach(lesson => {
        for (const field of ['title', 'summary', 'outcome']) assert.ok(lesson[field][locale].trim());
      });
    }
    ids.push(...lessons.map(lesson => lesson.id));
  });
  assert.equal(ids.length, 33);
  assert.equal(new Set(ids).size, 33, 'Lesson IDs must not collide across courses.');
});

test('all courses expose usable chapter links, correct service links and honest unpublished-video states', () => {
  for (const locale of ['en', 'id']) {
    const directory = page(`${locale}/learn`);
    for (const course of learningSeries) {
      const html = page(`${locale}/learn/${course.slug}`);
      assert.ok(directory.includes(`href="/${locale}/learn/${course.slug}/"`));
      assert.equal((html.match(/data-chapter="/g) ?? []).length, 3);
      for (const id of course.lessonIds) {
        assert.ok(html.includes(`href="#lesson-${id}"`));
        assert.ok(html.includes(`id="lesson-${id}"`));
        assert.ok(html.includes(`id="lesson-heading-${id}"`));
      }
      assert.ok(html.includes(`href="/${locale}/services/${course.category}/"`));
      assert.ok(html.includes(locale === 'id' ? 'Video belum tersedia' : 'Video coming soon'));
      assert.doesNotMatch(html, /<iframe|data-video-load|data-lesson-complete=/);
      assert.doesNotMatch(html, /data-lesson-panel="[^"]+" hidden/);
    }
    const legacy = page(`${locale}/learn/ux-visitor-action`);
    assert.ok(legacy.includes(`/${locale}/learn/website-business-sales-system/`));
    assert.ok(legacy.includes('http-equiv="refresh"'));
  }
});
