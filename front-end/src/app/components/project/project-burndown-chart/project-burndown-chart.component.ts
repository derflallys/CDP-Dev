import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Sprint} from 'src/app/models/sprint';
import {Issue} from 'src/app/models/issue';

import {saveAs} from 'file-saver';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';

export interface SprintVelocity {
  sprintTitle: string;
  velocity: number;
}

@Component({
  selector: 'app-project-burndown-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './project-burndown-chart.component.html',
  styleUrls: ['./project-burndown-chart.component.css']
})
export class ProjectBurndownChartComponent implements OnInit {

  title = 'BurnDownChart du projet';
  sprints: Sprint[] = this.data.sprints;
  issues: Issue[] = this.data.issues;
  totalDifficulty: number;
  velocities: SprintVelocity[] = [];
  noData: boolean;

  // D3JS
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { sprints: null, issues: null }
  ) {
    this.width = 700 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    const sumDifficulty = (arr: Issue[]) => arr.map((i: Issue) => i.difficulty).reduce((a, b) => a + b, 0);
    this.totalDifficulty = sumDifficulty(this.issues);

    // Consider only sprints that has been started (others have 0 difficulty point)
    const startedSprint = this.sprints.filter(s => s.state !== 'To Start');
    this.noData = startedSprint.length === 0;

    this.velocities.push({
      sprintTitle: 'Début projet',
      velocity: this.totalDifficulty
    });
    let currentDifficulty = this.totalDifficulty;
    startedSprint.forEach(sprint => {
      const sprintIssues = this.issues.filter(i => i.sprintId === sprint._id);
      // Velocity is determined by calculating sum of finished issues in sprint
      const doneSprintIssues = sprintIssues.filter(i => i.state === 'DONE');
      const velocity = sumDifficulty(doneSprintIssues);
      currentDifficulty -= velocity;
      this.velocities.push({
        sprintTitle: sprint.title + ' - ' + sprint.sprintId,
        velocity: currentDifficulty
      });
    });
    console.log('velocities', this.velocities);

    // Generate the chart
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3.select('#burndown')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scalePoint()
      .range([0, this.width])
      .domain(this.velocities.map(v => v.sprintTitle));

    this.y = d3Scale.scaleLinear()
      .range([this.height, 0])
      .domain([0, this.totalDifficulty]);
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
    this.svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('class', 'axis-title')
      .attr('y', 0 - this.margin.left)
      .attr('x', 0 - (this.height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Difficulté');
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x( (s: SprintVelocity) => this.x(s.sprintTitle) )
      .y( (s: SprintVelocity) => this.y(s.velocity) );

    this.svg.append('path')
      .datum(this.velocities)
      .attr('class', 'line')
      .attr('d', this.line);
  }

  contains(str, arr) {
    return arr.indexOf( str ) === -1 ? false : true;
  }

  getCSSStyles( parentElement ) {
    const selectorTextArr = [];

    // Add Parent element Id and Classes to the list
    selectorTextArr.push( '#' + parentElement.id );

    // tslint:disable-next-line:prefer-for-of
    for (let c = 0; c < parentElement.classList.length; c++) {
      if ( !this.contains('.' + parentElement.classList[c], selectorTextArr) ) {
        selectorTextArr.push( '.' + parentElement.classList[c] );
      }
    }

    // Add Children element Ids and Classes to the list
    const nodes = parentElement.getElementsByTagName('*');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < nodes.length; i++) {
      const id = nodes[i].id;
      if ( !this.contains('#' + id, selectorTextArr) ) {
        selectorTextArr.push( '#' + id );
      }

      const classes = nodes[i].classList;
      // tslint:disable-next-line:prefer-for-of
      for (let c = 0; c < classes.length; c++) {
        if ( !this.contains('.' + classes[c], selectorTextArr) ) {
          selectorTextArr.push( '.' + classes[c] );
        }
      }
    }

    // Extract CSS Rules
    let extractedCSSText = '';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < document.styleSheets.length; i++) {
      const s = document.styleSheets[i];

      try {
        // @ts-ignore
        if (!s.cssRules) { continue; }
      } catch ( e ) {
        if (e.name !== 'SecurityError') { throw e; } // for Firefox
        continue;
      }

      // @ts-ignore
      const cssRules = s.cssRules;

      // tslint:disable-next-line:prefer-for-of
      for (let r = 0; r < cssRules.length; r++) {
        if ( this.contains( cssRules[r].selectorText, selectorTextArr ) ) {
          extractedCSSText += cssRules[r].cssText;
        }
      }
    }


    return extractedCSSText;

  }


  saveFile(dataBlob ) {
    saveAs( dataBlob, 'BurnDownChart Project'  );
  }
  appendCSS( cssText, element ) {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.innerHTML = cssText;
    const refNode = element.hasChildNodes() ? element.children[0] : null;
    element.insertBefore( styleElement, refNode );
  }
  exportImg() {
    const doctype = '<?xml version="1.0" standalone="no"?>'
      + '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"\n' +
      '    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
    const svgNode = d3.select('#burndown').node();
    const cssStyle = this.getCSSStyles(svgNode);
    this.appendCSS(cssStyle, svgNode);
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink=');
    svgString = svgString.replace(/NS\d+:href/g, 'xlink:href');

    const blob = new Blob([ doctype + svgString], { type: 'image/svg+xml' });

    const url = window.URL.createObjectURL(blob);
    const img = new Image();

    img.onload = () => {
      const canvas = d3.select('body').append('canvas').node();
      canvas.width = 700;
      canvas.height = 400;

      const ctx = canvas.getContext('2d');

      // draw image on canvas
      ctx.clearRect ( 0, 0, 700, 400 );
      ctx.drawImage(img, 0, 0, 700, 400);
      const canvasUrl = canvas.toDataURL('image/png');
      this.saveFile(canvasUrl);
      canvas.remove();
      // ajax call to send canvas(base64) url to server. Or create anchor tag to give download option
    };
    img.src =  url;

  }

}
